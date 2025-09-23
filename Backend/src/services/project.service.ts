// services/project.service.ts
import type { PoolClient } from "pg";
import { ProjectRepository } from "@repositories/project.repository.js";
import { NotFoundError } from "@errors/http-error.js";
import type { Project } from "src/types/project.js";

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async getAllProjects(client: PoolClient) {
    const projects = await this.projectRepository.findAll(client);

    if (!projects.length) {
      throw new NotFoundError("Nenhum projeto encontrado");
    }

    return projects;
  }

  async postCreateProject(client: PoolClient, project: Project) {
    const projects = await this.projectRepository.createOne(client,project);

    console.log(projects)

    return projects;
  }
}