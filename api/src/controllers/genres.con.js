const { Genre } = require("../db");

const getGenres = async (req, res) => {
  try {
    let genres = await Genre.findAll();
    if (genres.length === 0) {
      return res.status(404).json({
        data: null,
        msg: "Tabla de Géneros vacía",
      });
    }
    res.status(200).json({
      data: genres,
      msg: "Todos los géneros",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      msg: "something went wrong, try again",
    });
  }
};

module.exports = { getGenres };