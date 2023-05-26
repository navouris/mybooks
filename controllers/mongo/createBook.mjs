import * as model from '../../model/model_mongo.mjs';

async function createBook(req, res){
    console.log("POST /create session=", req.session);
    const userID = req.session.userID;
    console.log(userID);
    const newBook = {"title":req.body.title, "author":req.body.author, "comment":req.body.comment}
    try {
      await model.newBook(newBook, userID);
      res.redirect("/books");
    } catch(err){
      return console.error(err.message);
    }
  }
export default createBook