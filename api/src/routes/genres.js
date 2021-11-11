const { Router } = require ("express");
const { getGenres } = require("../controllers/genres.con");
const router = Router();

router.route("/").get(getGenres);

module.exports = router;