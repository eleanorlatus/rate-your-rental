module.exports = {
    getProperty: async (req, res) => {
        try {
          res.render("property.ejs");
        } catch (err) {
          console.log(err);
        }
      },
  };