import * as model from "../../model/model_lite.mjs";

function deleteBook (req, res) {
    console.log("GET /delete/:id=", "session=", req.session);
    const id = req.params.id;
    model.deleteBook(id, (err, res) => {
      if (err) {
        return console.error(err.message);
      }
    })
    res.redirect("/books");
  }

export default deleteBook;