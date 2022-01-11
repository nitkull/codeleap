const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${NODE_ENV}` });
const Bluebird = require("bluebird");

const { getClient } = require("../helpers/mongodb");
const { breeds } = require("./breeds");

let db;

async function seedItem() {
  const ItemModel = db.collection("breeds");

  console.log("First remove all data");
  await ItemModel.removeMany({});

  return Bluebird.mapSeries(breeds, async (item) => {
    return ItemModel.insertOne(item);
  });
}

async function seed() {
  await seedItem();
}

getClient()
  .then(
    (client) => {
      console.error("Mongodb connected successfully");
      db = client.db(client.s.options.dbName);
      return seed();
    },
    (err) => {
      console.error("Failed to connect to mongodb");
      console.error(err);
    }
  )
  .then(
    () => {
      console.log("Seed finished successfully");
    },
    (err) => {
      console.error("Seed failed");
      console.error(err);
    }
  )
  .finally(() => process.exit(0));
