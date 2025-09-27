import type { FastifyInstance } from "fastify";
import { GitlabService } from "@services/gitlab.service.js";

import { GitlabController } from "@controllers/gitlab.controller.js";
import { ReleaseNoteService } from "@services/releaseNotes.service.js";


export async function gitlabRoutes(fastify: FastifyInstance) {
  const releaseNotesService = new ReleaseNoteService()
  const gitlabService = new GitlabService(fastify.log);
  const controller = new GitlabController(gitlabService,releaseNotesService);

  fastify.get(
    "/",
    controller.getProjectById.bind(controller)
  );

}
