const { Router } = require("express");
const axios = require("axios");
const response = require ("../app");
const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// defino la variable data para asignarle todos los juegos (incluyendo los de la BD)
let data = [];

// hago las llamadas a la API con sus distintas páginas
const page1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
const page2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
const page3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
const page4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
const page5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);

// Pusheo en data el contenido de las 5 páginas
Promise.all([page1, page2, page3, page4, page5]).then(function (contents) {
  contents.forEach((element) => {
    for (let i = 0; i < 20; i++) {
      data.push({
        id: element.data.results[i].id,
        name: element.data.results[i].name,
        description: element.data.results[i].description,
        released: element.data.results[i].released,
        rating: element.data.results[i].rating,
        genres: element.data.results[i].genres,
        platforms: element.data.results[i].platforms,
        background_image: element.data.results[i].background_image,
      });
    }
  });
});

// Llamo a la API para traer todos los géneros y los guardo uno por uno en la BD
axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then((response) =>
  response.data.results.map((genre) => {
    Genre.create(
      {
        id: genre.id,
        name: genre.name,
      },
      {
        include: "videogames",
      }
    );
  })
);

// Configurar los routers
router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let found = [];
  let counter = 0;

  // Verificamos si nos pasaron un nombre como query
  // Ej: /videogames?name=Grand
  if (name) {
    //console.log(name)
    // Si hay un nombre entonces buscar los primeros 15 juegos que contengan esa palabra
    data.map((game) => {
      if (game.name.toLowerCase().includes(name.toLowerCase()) && counter < 15) {
        //console.log(counter)
        found.push(game.name);
        counter++;
      }
    });

    if (found.length > 0) {
      // Si se encontraron juegos entonces mostrarlos
      //console.log(found)
      res.json(found);
    }
    // Sino lanzar un mensaje de error
    else
      res.status(404).json({
        error: `The video game ${name} not found`,
      });
  }

  // Busco los juegos que hay en la BD
  const gamesDB = await Videogame.findAll({
    include: {
      model: Genre,
    },
  });

  let arrayIndex = [];
  // Busco el índice de los juegos de la BD que tienen el mismo "id" que los de la API
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < gamesDB.length; j++) {
      if (data[i].id === gamesDB[j].id) arrayIndex.push(j);
    }
  }

  // Pusheo a data solo los juegos de la BD que tengan distinto "id"
  gamesDB.map((element, index) => {
    if (arrayIndex[index] === index) return;

    data.push({
      id: element.dataValues.id,
      name: element.dataValues.name,
      background_image: element.dataValues.background_image,
      description: element.dataValues.description,
      released: element.dataValues.released,
      rating: element.dataValues.rating,
      genres: element.dataValues.genres,
      platforms: element.dataValues.platforms,
      db: true,
    });
  });

  res.json(data);
});

router.get("/videogame/:id", (req, res) => {
  const { id } = req.params;
  let gameFounded;

  // Busco un juego con esa id
  data.map((game) => {
    if (game.id.toString() === id) gameFounded = game;
  });

  // Si el juego es de la API
  if (!gameFounded.hasOwnProperty("db")) {
    // Uso el "search" brindado por la API
    axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then((response) => res.json(response.data));
  } else {
    // Sino.. si es de la BD mostrarlo
    res.json(gameFounded);
  }
});

router.get("/genres", async (req, res) => {
  // Busco todos los géneros desde la BD
  const db = await Genre.findAll({
    include: {
      model: Videogame,
    },
  });

  // Los muestro como "json"
  res.json(db);
});

router.post("/videogame", async (req, res) => {
  const {
    name,
    background_image,
    description,
    genres,
    released,
    rating,
    platforms,
  } = req.body;

  let platformsString = "";

  // Guardo las plataformas en un string
  platforms.map(
    (platform) => (platformsString = platformsString + platform + " | ")
  );

  let id = -1;
  let founded;

  // Busco un id disponible para el nuevo juego
  do {
    id++;
    founded = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        founded = true;
        break;
      }
    }
  } while (founded);

  let videogame;

  // Si tiene propiedades válidas entonces..
  if (name && description && platforms) {
    // Creo el nuevo juego
    videogame = await Videogame.create(
      {
        id: id,
        name: name,
        background_image: background_image,
        description: description,
        released: released,
        rating: rating,
        platforms: platformsString,
        db: true,
      },
      {
        include: "genres",
      }
    );

    // Busco los generos que le pertenecen al nuevo juego
    const genresDBfounded = await Genre.findAll({
      // [Op.or]: Lo uso para establecer una condición "or" ( || )
      // EJ: Cuando "name" sea igual a Arcade o Educational
      where: { [Op.or]: { name: genres } },
    });

    // Añado géneros a el nuevo videojuego, y esos géneros van a tener
    //  este videojuego. Esto se ve reflejado en la BD
    videogame.addGenres(genresDBfounded);

    // Todo OK
    res.send(req.body);
  }
});

module.exports = router;