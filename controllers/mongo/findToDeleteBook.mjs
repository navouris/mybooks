import * as model from '../../model/model_mongo.mjs';

async function findToDeleteBook(req, res) {
  console.log("GET /delete/:id session=", req.session);
  const id = req.params.id;
  console.log("GET /delete/:id", id);
  try {
    const row = await model.findBook(id, req.session.userID);
    console.log(row)
    console.log("TO BE DELETED...", row);
    const toBeDeleted = {title: row[0].title, author: row[0].author, comment: row[0].comment, bookID: row[0]._id};
    res.render("delete", { data: toBeDeleted });
  } catch(err){
    return console.error(err.message);
  }
}

export default findToDeleteBook ;
