
function about(req, res) {
    console.log("GET /about session=", req.session);
    res.render("about");
  }


  export default about