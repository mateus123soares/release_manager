import type { FastifyInstance } from "fastify";
import { ProjectController } from "@controllers/release.controller.js";

export async function releaseNotesRoutes(fastify: FastifyInstance) {

  const controller = new ProjectController();

  fastify.get(
    "/",
    controller.getProject.bind(controller)
  );
}
