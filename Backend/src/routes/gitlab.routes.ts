import type { FastifyInstance } from 'fastify';

import { FastifyLogger } from '@config/logger.js';
import { GitlabController } from '@controllers/gitlab.controller.js';
import { GitlabService } from '@services/gitlab.service.js';
import { ReleaseNoteService } from '@services/releaseNotes.service.js';

export async function gitlabRoutes(fastify: FastifyInstance) {
  const logger = new FastifyLogger(fastify.log);

  const releaseNotesService = new ReleaseNoteService(logger);
  const gitlabService = new GitlabService(logger);
  const controller = new GitlabController(gitlabService, releaseNotesService);

  fastify.get('/', controller.getProjectById.bind(controller));
}
