import type { FastifyInstance } from "fastify";
import { GitlabService } from "@services/gitlab.service.js";
import { GitlabController } from "@controllers/gitlab.controller.js";


export async function gitlabRoutes(fastify: FastifyInstance) {
  const service = new GitlabService(fastify.log);
  const controller = new GitlabController(service);

  fastify.get(
    "/",
    controller.getProjectById.bind(controller)
  );

}
