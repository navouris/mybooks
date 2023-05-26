import * as model from '../../model/model_mongo.mjs';

async function getBooks(req, res) {
  console.log("GET /books session=", req.session);
  const userID = req.session.userID;
  const userName = req.session.userName;
  try {
    const rows = await model.getMyBooks(userID);
    // mapping of mongoDB _id to bookID
    const theRows = rows.map((row) => { return { bookID: row._id, title: row.title, author: row.author, comment: row.comment } })
    console.log("books to show...", theRows)
    res.render("books", { user: userName, data: theRows });
  } catch(err){
    return console.error(err.message);
  }
}

  export default getBooks