const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, //puede ser v1 o v4, es para que nos dé un ID único por asi decirlo
      primaryKey: true,
      allowNull: false, //allowNull permite que este vacio, false significa que no me permite que este vacio
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    platform: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
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
