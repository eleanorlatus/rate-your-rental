module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs"), {user: req.user};
    console.log(req.user)
  },
};
