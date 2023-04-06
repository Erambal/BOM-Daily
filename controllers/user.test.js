const { MongoClient } = require('mongodb');

describe('User Controller', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Inserts user by ID', async () => {
    const user = db.collection('user');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await user.insertOne(mockUser);

    const insertedUser = await user.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});