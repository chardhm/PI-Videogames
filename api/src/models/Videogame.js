const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,//este
      primaryKey: true, //allowNull permite que este vacio, false significa que no me permite que este vacio
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: true,//este
    },
    rating: {
      type: DataTypes.STRING,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,//este
    },
     // Identifico que pertenece a la BD
     db: {
      type: DataTypes.STRING,
      default: "Pertenece a la BD",
    },
  });
  /* ({timestamps: false}); */
   // Me conecto a la BD desde el modelo "Genre"
   sequelize
   .authenticate()
   .then(() => console.log("SUCCESFULL CONNECT TO DB VIDEOGAME"))
   .catch((error) => console.log("ERROR DE CONEXIÓN: " + error));
};
