import type { FastifyInstance } from "fastify";
import { ProjectController } from "@controllers/project.controller.js";
import { ProjectService } from "@services/project.service.js";
import { ProjectRepository } from "@repositories/project.repository.js";
import { projectSchema } from "@schemas/project.schema.js";
import type { Project } from "src/types/project.js";

export async function projectRoutes(fastify: FastifyInstance) {
  const repository = new ProjectRepository();
  const service = new ProjectService(repository);
  const controller = new ProjectController(service);

  fastify.post<{ Body: Project }>(
    "/create",
    { schema: projectSchema },
    controller.postCreateProject.bind(controller)
  );

  fastify.get(
    "/list",
    controller.getProject.bind(controller)
  );
}
