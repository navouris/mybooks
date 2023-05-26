import * as model from '../../model/model_lite.mjs'

function getBooks(req, res) {
    console.log("GET /books session=", req.session);
    const userID = req.session.userID;
    const userName = req.session.userName;
    model.getMyBooks(userID, (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("books to show...", rows)
      res.render("books", { user: userName, data: rows });
    });
  }

  export default getBooks