import * as model from '../../model/model_mongo.mjs';

async function getUser(req, res)  {
    console.log("GET / session=", req.session);
    const userID = req.session.userID
    console.log("/get/", userID)
    if (userID){
      try {
        const row = await model.findUser(userID, null) // findUser (userID=null, userName=null)
        console.log('the found user is:', row)
        res.render("index", {user: row.userName});
      } catch(err){
        return console.error(err.message);
      }
    } else
    res.render("index");
  }

  export default getUser