const MongoClient = require('mongodb').MongoClient;

const { MONGO_URI } = process.env;

const getClient = async () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, client) {
        if (err) {
          reject(err);
        }
        resolve(client);
      },
    );
  });

module.exports = { getClient };
