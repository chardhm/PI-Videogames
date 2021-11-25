/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  id: 1,
  name: 'Super Mario Bros',
  description: 'Nostalgia',
  platforms: "PC",
  genres: ["Family"]
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /genres', () => {
    it('should get 200', async () =>
      await agent.get('/genres').expect(200 || 304)
    );
    it('should return a json', () =>
      agent.get('/genres').then((res) => {
        expect("Content-Type", /json/)
      }));
  });
});
