// import Knex, { PgConnectionConfig } from 'knex';
// import { Pool } from 'pg';

// let knexInstance: Knex;
// let poolInstance: Pool;

// export function getConnectionConfig(): PgConnectionConfig {
//   const {
//     DATABASE_USER: user,
//     DATABASE_PASS: password,
//     DATABASE_HOST: host,
//     DATABASE_PORT: port,
//     DATABASE_NAME: database,
//     DATABASE_SSL: ssl
//   } = process.env;

//   return {
//     host,
//     database,
//     user,
//     password,
//     port: +port,
//     ssl: !!ssl
//   };
// }

// export function getKnexDbConfigs(): Knex.Config {
//   const { DATABASE_POOL_MIN, DATABASE_POOL_MAX } = process.env;

//   const connection = getConnectionConfig();

//   let min = 0;
//   let max = 1;
//   try {
//     min = parseInt(DATABASE_POOL_MIN);
//     max = parseInt(DATABASE_POOL_MAX);
//   } catch (e) {}

//   const configs = {
//     client: 'postgresql',
//     connection,
//     pool: { min, max }
//   };
//   return configs;
// }

// export function createKnexInstance(): Knex {
//   const configs = getKnexDbConfigs();
//   if (!knexInstance) {
//     knexInstance = Knex(configs);
//   }
//   return knexInstance;
// }

// export function createPGPoolInstance(): Pool {
//   const cConfig = getConnectionConfig();
//   if (!poolInstance) {
//     poolInstance = new Pool(cConfig);
//   }
//   return poolInstance;
// }
