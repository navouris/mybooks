import * as model from '../../model/model_lite.mjs';

function getUser(req, res)  {
    console.log("GET / session=", req.session);
    const userID = req.session.userID
    console.log("/get/", userID)
    if (userID){
      model.findUser(userID, null, (err, row) => {
        if (err){
          console.error(err.message);
        } else
          console.log(row)
          res.render("index", {user: row[0].userName});
      });
    } else
    res.render("index");
  }

  export default getUser