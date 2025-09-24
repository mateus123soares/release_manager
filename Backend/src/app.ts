import 'dotenv/config';
import Fastify from 'fastify'

import { fastifyPostgres } from "@fastify/postgres";
import { fastifyHelmet } from '@fastify/helmet'
import { fastifyCors } from '@fastify/cors'

import databaseConfig from '@config/database.js';
import { registerErrorHandler } from "@config/error-handler.js";

import { index } from '@routes/index.js';
import { projectRoutes } from '@routes/projects.routes.js';
import { releaseNotesRoutes } from '@routes/releaseNotes.routes.js';
import  ajvErrors from 'ajv-errors';

const fastify = Fastify({
  logger: true,
  ajv: {
    plugins: [ajvErrors as any], // ativa suporte a mensagens customizadas
    customOptions: { allErrors: true } // importante para capturar todas as mensagens
  }
})

//console.log(databaseConfig)

fastify.setErrorHandler(registerErrorHandler);

fastify.register(fastifyHelmet)
fastify.register(fastifyPostgres,databaseConfig);
fastify.register(fastifyCors, {origin: '*'})

fastify.register(index)
fastify.register(projectRoutes, {prefix: "/projects"})
fastify.register(releaseNotesRoutes, {prefix: "/release"})

export default fastify;