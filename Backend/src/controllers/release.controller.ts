// controllers/project.controller.ts
import type { FastifyReply, FastifyRequest } from "fastify";

import generateReleaseNotes from "src/utils/generateReleaseNotes.js";

export class ProjectController {

  async getProject(Request: FastifyRequest, Reply: FastifyReply) {
      generateReleaseNotes()
      Reply.code(200)
  } 
}
