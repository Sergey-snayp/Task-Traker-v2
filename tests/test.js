const { dropDatabase, Mongoose } = require('./testHelper');

before(async () => {
  process.env.NODE_ENV = 'test';
  // drop database
});

beforeEach(async () => {
  process.env.NODE_ENV = 'test';
  // drop database
});
