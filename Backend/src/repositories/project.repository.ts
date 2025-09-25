import { handleDatabaseError } from "@errors/database-error.js";
import type { PoolClient } from "pg";
import type { Project } from "src/types/project.js";

export class ProjectRepository {
  async findAll(client: PoolClient) {
    try {
      const { rows } = await client.query("SELECT * FROM projects");
      return rows;
    } catch (err: unknown) {
        if (err instanceof Error)
          throw handleDatabaseError(err); // qualquer outro erro de DB
    }
  }
  async createOne(client: PoolClient, project: Project) {
    try {
      
      const query = `
        INSERT INTO public.projects (name, description)
        VALUES ($1, $2)
        RETURNING *;
      `;

      const values = [project.name, project.description];
      const { rows } = await client.query(query, values);

      return rows[0];

    } catch (err: unknown) {
        if (err instanceof Error)
          throw handleDatabaseError(err); // qualquer outro erro de DB
    }
  }
}