import * as model from '../../model/model_lite.mjs';

function getCreateUser(req, res) {
    console.log("POST / session=", req.session);
    console.log("/", req.body.userName);
    // έχει συμπληρωθεί το userName στη φόρμα
    // βρες τον χρήστη id ή δημιούργησε χρήστη αν δεν υπάρχει
    let userID = null;
    let userName = req.body.userName
    model.findUser(userID, userName, (err, row) => {
      console.log('POST / returned row....', row)
      if (err){
        console.log(err.message);
      } else {
        req.session.userID = row[0].userID;
        req.session.userName = row[0].userName;
        console.log("new session", req.session)
      }
      res.redirect("/")
    });
  }

  export default getCreateUser