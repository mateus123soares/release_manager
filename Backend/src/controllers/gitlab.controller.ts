import type { FastifyReply, FastifyRequest } from 'fastify';

import { GitlabService } from '@services/gitlab.service.js';
import { ReleaseNoteService } from '@services/releaseNotes.service.js';
import type { ReleaseNote } from 'src/types/releaseNotes.js';

export class GitlabController {
  constructor(
    private gitlabService: GitlabService,
    private releaseNoteService: ReleaseNoteService,
  ) {}

  async getProjectById(Request: FastifyRequest, Reply: FastifyReply) {
    const project = await this.gitlabService.getProjectById(74704036);
    return Reply.code(200).send(project);
  }

  async postGenerateReleaseNote(Request: FastifyRequest, Reply: FastifyReply) {
    const resume =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    const metadata: ReleaseNote = {
      project: 'Teste',
      projectID: 74704036,
      branch: 'main',
      resume: resume,
      release: 'v1.0.0',
    };

    this.releaseNoteService.generateReleaseNotes(metadata);
    return Reply.code(200).send('ok');
  }
}
