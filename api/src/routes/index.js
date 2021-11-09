const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Videogame, Genre } = require("../db");


const router = Router();
const videogamesRoutes = require ("./videogames");
const genresRoutes = require ("./genres");


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* router.use("/videogames", videogamesRoutes);
router.use("/genres", genresRoutes); */

module.exports = router;