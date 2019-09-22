var express = require("express");

var router = express.Router();

var burgers = require("../models/burgers.js");

// Routes
router.get("/", function(req, res) {
  burgers.all(function(data) {
    var burgersObject = {
      burgers: data
    };
    console.log(burgersObject);
    res.render("index", burgersObject);
  });
});

router.post("/api/burger", function(req, res) {
  burgers.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function(result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.update(
    {
      burger_name: req.body.burger_name
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.delete("/api/burger/:id", function(req, res) {
  burgers.delete(req.params.id, function(result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;