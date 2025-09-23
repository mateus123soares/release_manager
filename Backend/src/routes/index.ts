import type { FastifyInstance } from "fastify";

import { IndexController } from "@controllers/index.controller.js";

export const indexController = new IndexController();

export async function index (fastify: FastifyInstance ) {
  fastify.get('/health',indexController.gethealth)
}
