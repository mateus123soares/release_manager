// services/project.service.ts
import type { PoolClient } from 'pg';

import { NotFoundError } from '@errors/http-error.js';
import { ProjectRepository } from '@repositories/project.repository.js';
import type { Logger } from 'src/types/error.js';
import type { Project } from 'src/types/project.js';

export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private logger: Logger,
  ) {}

  async getAllProjects(client: PoolClient) {
    this.logger.info(`Info: buscando todos os projetos no banco`);
    const projects = await this.projectRepository.findAll(client);

    if (!projects.length) {
      throw new NotFoundError('Nenhum projeto encontrado');
    }

    return projects;
  }

  async postCreateProject(client: PoolClient, project: Project) {
    this.logger.info(`Info: cadastrando um novo projeto no banco`);
    const projects = await this.projectRepository.createOne(client, project);

    console.log(projects);

    return projects;
  }
}
