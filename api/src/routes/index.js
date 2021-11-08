const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Videogame, Genre } = require('../db');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = router;




/*

//api key (quitar despues) = 931b4e802056402a9ad13bc2c9e98c48

~ API ~

VideoGames and Genres API links

https://api.rawg.io/api/games?key={API_KEY}
https://api.rawg.io/api/games?key=931b4e802056402a9ad13bc2c9e98c48
https://api.rawg.io/api/games/{id}?key={API_KEY}
https://api.rawg.io/api/games/1234?key=931b4e802056402a9ad13bc2c9e98c48

https://api.rawg.io/api/genres?key={API_KEY}
https://api.rawg.io/api/genres?key=931b4e802056402a9ad13bc2c9e98c48
https://api.rawg.io/api/genres/{id}?key={API_KEY}
https://api.rawg.io/api/genres/1?key=931b4e802056402a9ad13bc2c9e98c48



*/