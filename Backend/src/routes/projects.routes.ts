import type { FastifyInstance } from 'fastify';

import { FastifyLogger } from '@config/logger.js';
import { ProjectController } from '@controllers/project.controller.js';
import { ProjectRepository } from '@repositories/project.repository.js';
import { projectSchema } from '@schemas/project.schema.js';
import { ProjectService } from '@services/project.service.js';
import type { Project } from 'src/types/project.js';

export async function projectRoutes(fastify: FastifyInstance) {
  const logger = new FastifyLogger(fastify.log);
  const repository = new ProjectRepository();
  const service = new ProjectService(repository, logger);
  const controller = new ProjectController(service);

  fastify.post<{ Body: Project }>(
    '/create',
    { schema: projectSchema },
    controller.postCreateProject.bind(controller),
  );

  fastify.get('/list', controller.getProject.bind(controller));
}
