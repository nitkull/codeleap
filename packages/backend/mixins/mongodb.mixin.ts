const DbService = require('moleculer-db');
const MongoAdapter = require('moleculer-db-adapter-mongo');

import isFunction from 'lodash.isfunction';
import { Context, ServiceSchema } from 'moleculer';

const TESTING = process.env.NODE_ENV === 'test';

export interface MongoDbMixinOptions {
  disableActions?: boolean;
}

export function MongoDbMixin(
  collection: string,
  opts: MongoDbMixinOptions = {}
) {
  const { MONGO_USER: user, MONGO_PASS: pass, MONGO_DB: dbName } = process.env;
  const adapter = TESTING
    ? new DbService.MemoryAdapter()
    : new MongoAdapter(process.env.MONGO_URI || 'mongodb://localhost', {
        user,
        pass,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName
      });
  const schema: ServiceSchema = {
    name: '',
    mixins: [DbService],
    adapter,
    collection,

    methods: {
      entityChanged(type: string, json: any, ctx: Context) {
        return this.clearCache().then(() => {
          const eventName = `${this.name}.entity.${type}`;
          return this.broker.broadcast(eventName, {
            meta: ctx.meta,
            entity: json
          });
        });
      },

      encodeID(id) {
        return id != null ? id.toString() : null;
      },

      decodeID(id) {
        if (typeof id === 'string' && this.adapter.stringToObjectID) {
          return this.adapter.stringToObjectID(id);
        }

        return id;
      }
    },

    async afterConnected() {
      /* istanbul ignore next */
      if (!TESTING) {
        // Create indexes
        if (this.settings && this.settings.indexes) {
          try {
            await this.Promise.all(
              this.settings.indexes.map((idx: any) =>
                this.adapter.collection.createIndex(idx)
              )
            );
          } catch (err) {
            this.logger.error('Unable to create indexes.', err);
          }
        }
      }

      if (process.env.TEST_E2E) {
        // Clean collection
        this.logger.info(`Clear '${collection}' collection before tests...`);
        await this.adapter.clear();
      }

      // Seeding if the DB is empty
      const count = await this.adapter.count();
      if (count === 0 && isFunction(this.seedDB)) {
        this.logger.info(`Seed '${collection}' collection...`);
        await this.seedDB();
      }
    }
  };

  if (opts.disableActions) {
    schema.actions = {
      create: false,
      insert: false,
      count: false,
      list: false,
      find: false,
      get: false,
      update: false,
      remove: false
    };
  }

  return schema;
}
