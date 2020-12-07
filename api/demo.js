const express = require("express");
const router = express.Router();
const demoController = require("../controller/demoController");

const use = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/", (req, res, next) => {
  res.send("Application API is working");
});

router.get("/select", use(demoController.select));
router.post("/insert", use(demoController.create));
router.post("/insert-many", use(demoController.createMany));
router.put("/update", use(demoController.update));
router.delete("/delete", use(demoController.delete));

module.exports = router;
