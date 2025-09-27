import 'dotenv/config';
import Fastify from 'fastify'

import { fastifyPostgres } from "@fastify/postgres";
import { fastifyHelmet } from '@fastify/helmet'
import { fastifyCors } from '@fastify/cors'

import databaseConfig from '@config/database.js';
import { registerErrorHandler } from "@config/error-handler.js";


import { projectRoutes } from '@routes/projects.routes.js';
import { gitlabRoutes } from '@routes/gitlab.routes.js';

import  ajvErrors from 'ajv-errors';

const fastify = Fastify({
  logger: true,
  ajv: {
    plugins: [ajvErrors as any], // eslint-disable-line
    customOptions: { allErrors: true } // importante para capturar todas as mensagens
  }
})

//console.log(databaseConfig)

fastify.setErrorHandler(registerErrorHandler);

fastify.register(fastifyHelmet)
fastify.register(fastifyPostgres,databaseConfig);
fastify.register(fastifyCors, {origin: '*'})

fastify.register(projectRoutes, {prefix: "/projects"})
fastify.register(gitlabRoutes, {prefix: "/gitlab"})

export default fastify;