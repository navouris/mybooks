import * as model from '../../model/model_lite.mjs';

function updateBook(req, res) {
    console.log("POST /edit/:id session=", req.session);
    const id = req.params.id;
    // const book = [req.body.title, req.body.author, req.body.comment, id];
    const book = {"title":req.body.title, "author":req.body.author, "comment":req.body.comment, "bookID":id, "user": req.session.userID}
    model.updateBook(book, (err, data) => {
      console.log('in POST', err, data)
      if(err){
        return console.error(err.message);
      }
      else {
        res.redirect("/books");
      }  
    });
  }

export default updateBook