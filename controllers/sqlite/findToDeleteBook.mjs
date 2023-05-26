import * as model from '../../model/model_lite.mjs'

function findToDeleteBook(req, res) {
    console.log("GET /delete/:id session=", req.session);
    const id = req.params.id;
    console.log("GET /delete/:id", id);
    model.findBook(id, (err, row) => {
      if (err) {
        return console.error(err.message);
      } 
      console.log("TO BE DELETED...", row);
      res.render("delete", { data: row[0] });
    });
    console.log('END of GET /delete/:id')
  };

export default findToDeleteBook ;
