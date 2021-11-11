const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videogamesRoutes = require ("./videogames.js");
const videogameRoutes = require ("./videogame.js");
const genresRoutes = require ("./genres.js");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoutes);
router.use("/videogame", videogameRoutes);
router.use("/genres", genresRoutes);


module.exports = router;