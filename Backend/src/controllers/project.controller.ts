// controllers/project.controller.ts
import type { FastifyReply, FastifyRequest } from 'fastify';

import { ProjectService } from '@services/project.service.js';
import type { Project } from 'src/types/project.js';

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  async getProject(Request: FastifyRequest, Reply: FastifyReply) {
    const client = await Request.server.pg.connect();
    try {
      const rows = await this.projectService.getAllProjects(client);
      return Reply.status(200).send(rows);
    } finally {
      client.release();
    }
  }

  async postCreateProject(
    Request: FastifyRequest<{ Body: Project }>,
    reply: FastifyReply,
  ) {
    const client = await Request.server.pg.connect();
    try {
      const rows = await this.projectService.postCreateProject(client, {
        name: Request.body.name,
        description: Request.body.description,
        gitlab_project_id: Request.body.gitlab_project_id,
      });
      return reply.status(200).send(rows);
    } finally {
      client.release();
    }
  }
}
