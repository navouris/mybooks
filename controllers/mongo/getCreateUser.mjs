import * as model from '../../model/model_mongo.mjs';

async function getCreateUser(req, res) {
    console.log("POST / session=", req.session);
    console.log("/", req.body.userName);
    // έχει συμπληρωθεί το userName στη φόρμα
    // βρες τον χρήστη id ή δημιούργησε χρήστη αν δεν υπάρχει
    let userID = null;
    let userName = req.body.userName
    if (userName){
      try {
        const user = await model.findUser(null, userName);
        console.log("returned ... user", user)
        if (!user){
          const user = await model.insertUser(userName);
          console.log("new userID", user[0]._id)
          req.session.userID = user._id;
          req.session.userName = user.userName;
          console.log("new session", req.session)
        } 
        req.session.userID = user._id;
        req.session.userName = user.userName;
        console.log("new session", req.session)
        res.redirect("/")
        } catch(err){
        return console.error(err.message);
      }
    } else {
      console.log("no userName")
      res.redirect("/")
    }
}

export default getCreateUser