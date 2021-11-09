//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = conn.models;

async function getGenres() {//llamado Genres de API
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
     console.log(response.data.results);
    const genres = response.data.results.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });

     console.log(genres);
    addGenres(genres);
  } catch (error) {
    console.error(error);
  }
}

async function addGenres(genresApi) {
  await Genre.bulkCreate(genresApi, {
    fields: ["name"],
    ignoreDuplicates: true,
  });
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  getGenres()
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
