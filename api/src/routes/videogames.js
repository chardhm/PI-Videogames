const { Router } = require("express");
const router = Router();
const { getVg, getVgames } = require("../controllers/videogames.con");

router.route("/").get(getVg);
router.route("/:name").get(getVgames);


module.exports = router;