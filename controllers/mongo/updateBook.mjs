import * as model from '../../model/model_mongo.mjs';

async function updateBook(req, res) {
    console.log("POST /edit/:id session=", req.session);
    const id = req.params.id;
    // const book = [req.body.title, req.body.author, req.body.comment, id];
    const book = {"title":req.body.title, "author":req.body.author, "comment":req.body.comment, "_id":id}
    try {
      await model.updateBook(book, req.session.userID);
      res.redirect("/books");
    }
    catch(err){
      return console.error(err.message);
    }
  }

export default updateBook