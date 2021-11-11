const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("genre", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  // Me conecto a la BD desde el modelo "Genre"
  sequelize
  .authenticate()
  .then(() => console.log("SUCCESFULL CONNECT TO DB GENRE"))
  .catch((error) => console.log("ERROR DE CONEXIÓN: " + error));
};

