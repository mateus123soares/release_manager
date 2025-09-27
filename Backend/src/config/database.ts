import type { PostgresPluginOptions } from '@fastify/postgres';

const databaseConfig: PostgresPluginOptions = {
  connectionString: process.env.PG_CONNECTION_STRING,
  max: Number(process.env.PG_MAX_CONNECTIONS) || 20,
  idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT) || 30000,
};

export default databaseConfig;
