import * as model from '../../model/model_mongo.mjs';

async function deleteBook (req, res) {
    console.log("GET /delete/:id=", "session=", req.session);
    const id = req.params.id;
    try {
      const row = await model.deleteBook(id, req.session.userID);
      console.log(row)
      res.redirect("/books");
    } catch(err){
      return console.error(err.message);
    }
  }

export default deleteBook;