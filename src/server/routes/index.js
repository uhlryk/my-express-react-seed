import express from 'express';
let router = new express.Router();


router.get("/", (req, res) => {
  res.status(200).send("App is running");
});

module.exports = router;
