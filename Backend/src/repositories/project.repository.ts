import { handleDatabaseError } from "@errors/database-error.js";
import type { PoolClient, QueryResult } from "pg";
import type { Project } from "src/types/project.js";

export class ProjectRepository {
  async findAll(client: PoolClient): Promise<Project[]> {
    try {
      const { rows } = await client.query<Project>("SELECT * FROM projects");
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw handleDatabaseError(err);
      }
      throw err;
    }
  }

  async findOne(client: PoolClient, projectID: number): Promise<Project> {
    try {
      const query = `
        SELECT * FROM projects WHERE gitlab_project_id = $1
      `;
      const values = [projectID];

      const { rows }: QueryResult<Project> = await client.query(query, values);

      if (!rows[0]) {
        throw new Error(`Projeto com ID ${projectID} não encontrado`);
        // ou lançar um NotFoundError customizado
      }

      return rows[0];
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw handleDatabaseError(err);
      }
      throw err;
    }
  }

  async createOne(client: PoolClient, project: Project): Promise<Project | undefined> {
    try {
      
      const query = `
        INSERT INTO public.projects (name, description, gitlab_project_id)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;

      const values = [project.name, project.description, project.gitlab_project_id];
      const { rows } = await client.query(query, values);

      return rows[0];

    } catch (err: unknown) {
        if (err instanceof Error)
          throw handleDatabaseError(err);
    }
  }
}