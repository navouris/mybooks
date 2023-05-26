import * as model from '../../model/model_mongo.mjs';

async function findBook(req, res) {
    console.log("GET /edit/:id session=", req.session);
    const id = req.params.bookID;
    if(id){
      console.log('edit', id)
      try {
        const row = await model.findBook(id, req.session.userID);
        console.log(row)
        console.log('get /edit/id book to edit', row[0]);
        const bookToShow = {title: row[0].title, author: row[0].author, comment: row[0].comment, bookID: row[0]._id};
        res.render("edit", { data: bookToShow });
      } catch(err){
        return console.error(err.message);
      }
    }
  }

export default findBook