const router = require("express").Router();
const cards = [];
router.get("/getAll", (req, res) => {
    res.send({ data: cards });
  }
);
router.post("/add", (req, res) => {
      cards.push(req.body);
      res.send({ added: true });
  }
);

module.exports = router; 
 