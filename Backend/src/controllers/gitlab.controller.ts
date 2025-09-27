import { GitlabService } from "@services/gitlab.service.js";
import type { FastifyReply, FastifyRequest } from "fastify";


export class GitlabController {
  constructor(private gitlabService: GitlabService) {}

  async getProjectById(Request: FastifyRequest, Reply: FastifyReply) {
        const project = await this.gitlabService.getProjectById(74704036)
        return Reply.code(200).send(project)
  } 
}
