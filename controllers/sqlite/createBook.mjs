import * as model from '../../model/model_lite.mjs';

function createBook(req, res){
    console.log("POST /create session=", req.session);
    const userID = req.session.userID;
    console.log(userID);
    const newBook = {"title":req.body.title, "author":req.body.author, "comment":req.body.comment, "user": req.session.userID}
    model.newBook(newBook,
      (err, data)=> {
        if (err)
          return console.error(err.message);
        else
        res.redirect("/books");
      }); 
    }

export default createBook