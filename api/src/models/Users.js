const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("users", {
    // Le asigno las propiedades
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
  // Me conecto a la BD desde el modelo "Genre"
  sequelize
    .authenticate()
    .then(() => console.log("CONECTADO A LA BASE DE DATOS DE GENRE"))
    .catch((error) => console.log("ERROR DE CONEXIÓN: " + error));
};
