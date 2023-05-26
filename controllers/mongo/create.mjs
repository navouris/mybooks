function create(req, res) {
    console.log("GET /create, session=", req.session)
    res.render("create", { data: {} });
  }

export default create