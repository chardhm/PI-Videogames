const { Router } = require("express");
const router = Router();
const {
  getVg,
  createVg,
} = require("../controllers/videogame.con");

router.route("/:id").get(getVg);

router.route("/").post(createVg);

module.exports = router;