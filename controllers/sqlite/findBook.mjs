import * as model from '../../model/model_lite.mjs';

function findBook(req, res) {
    console.log("GET /edit/:id session=", req.session);
    const id = req.params.bookID;
    if(id){
      console.log('edit', id)
      model.findBook(id, (err, row) => {
        if (err) {
          res.send(err);
        } else {
          console.log('get /edit/id book to edit', row[0]);
          res.render("edit", { data: row[0] });
        }
      });
    }
  }

export default findBook