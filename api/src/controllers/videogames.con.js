const { Videogame } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getVgApi() {
  console.log("-----------Video Games Api-----------");
  let next;
  let promises = [];
  let apiVideogames = [];
  try {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );

    promises.push(response);
    next = response.data.next;
    for (let i = 0; i < 4; i++) {
      response = await axios.get(next.toString());
      promises.push(response);
      next = response.data.next;
    }
    const allPromise = Promise.all(promises);
    let values = await allPromise;
    values.forEach((element) => {
      apiVideogames = apiVideogames.concat(element.data.results);
    });
    apiVideogames = apiVideogames.map((element) => {
      return {
        id: element.id,
        name: element.name,
        description: element.description,
        released: element.released,
        background_image: element.background_image,
        rating: element.rating,
        platforms: element.platforms,
        genres: element.genres,
      };
    });
    console.log(apiVideogames.length);
    return apiVideogames;
  } catch (error) {
    console.error(error);
  }
}

async function getVigApi(name) {
  try {
    let response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}
const getVg = async (req, res) => {
  const { name } = req.params;
  try {
    let vgByName = await getVigApi(name);
    console.log(vgByName.length);
    res.status(200).json({
      data: vgByName,
      msg: "All videogames of table videogames whith that name",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      msg: "something went wrong, try again",
    });
  }
};

const getVgames = async (req, res) => {
  try {
    let videogamesApi = await getVgApi(); //traemos los videojuegos de la API
    let videogames = await Videogame.findAll(); // traemos los videojuegos de la BD
    videogames = videogames.concat(videogamesApi); // unimos los videojuegos BD/API
    res.status(200).json({
      data: videogamesApi,
      msg: "All videogames of table videogames",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      msg: "something went wrong, try again",
    });
  }
};

module.exports = { getVg, getVgames };