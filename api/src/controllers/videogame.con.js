const { Videogame } = require("../db");
const axios = require("axios").default;
const { API_KEY } = process.env;

async function getVgApi(id) {
  try {
    let response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

const getVg = async (req, res) => {
  const { id } = req.params;
  let vgById;
  try {
    if (id.includes("-")) {
      // aqui buscamos en nuestra BD
      vgById = await Videogame.findAll({
        where: {
          id: id,
        },
      });
    } else {
      // aqui buscamos dentro de la API
      vgById = await getVgApi(id);
      vgById = vgById.data;
      // console.log(vgById.status);
    }
    res.status(200).json({
      data: vgById,
      msg: "Videogame whith that ID",
    });
  } catch (error) {
    res.status(500).json({
      data: error,
      msg: "something went wrong, try again",
    });
  }
};

const createVg = async (req, res) => {
  const {// genres tiene que ser con array de los ID de generos
    name,
    description,
    released,
    background_image,
    rating,
    platforms,
    genres, 
  } = req.body;
  try {
    let newGame = await Videogame.create(
      {
        name,
        description,
        released,
        background_image,
        rating,
        platforms,
      },
      {
        fields: [
          "name",
          "description",
          "released",
          "background_image",
          "rating",
          "platforms",
        ],
      }
    );
    await newGame.addGenres(genres);
    res.json({ data: newGame, msg: "Videogame created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      msg: "something went wrong, try again",
    });
  }
};

const deleteVg = async (req, res) => {
  const { id } = req.params;
  try {
    let videogame = await Videogame.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ data: videogame, msg: "Videogame deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      msg: "something went wrong, try again",
    });
  }
};

const updateVg = async (req, res) => {
  const { id } = req.params;
  const { name, description, released, background_image, rating, platforms } =
    req.body;
  try {
    let videogame = await Videogame.findAll({
      attributes: [
        "name",
        "description",
        "released",
        "background_image",
        "rating",
        "platforms",
      ],
      where: {
        id: id,
      },
    });
    if (videogame.length > 0) {
      videogame.forEach(async (game) => {
        await game.update(
          {
            name: name,
            description: description,
            released: released,
            background_image: background_image,
            rating: rating,
            platforms: platforms,
          },
          {
            fields: [
              "id",
              "name",
              "description",
              "released",
              "background_image",
              "rating",
              "platforms",
            ],
          }
        );
      });
      return res
        .status(200)
        .json({ data: videogame, msg: "update successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      msg: "something went wrong, try again",
    });
  }
};

module.exports = {
  getVg,
  createVg,
  deleteVg,
  updateVg,
};