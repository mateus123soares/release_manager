import { NotFoundError } from "@errors/http-error.js";
import gitlab from '@config/gitlab.js';
import axios from 'axios';

import type { FastifyBaseLogger } from "fastify";

import type {AxiosRequestConfig} from 'axios';

export class GitlabService {
    constructor(private logger: FastifyBaseLogger) {}

    async getProjectById(projectID: number) {

        try {
          const axiosConfig: AxiosRequestConfig = {
            method: 'get',
            url: `${gitlab.host}/api/v4/projects/${projectID}`,
            headers: {
              'PRIVATE-TOKEN': `${gitlab.token}`,
            }
          };
          
          const project = await axios.request(axiosConfig);

          return {
            gitlab_id_project: projectID,
            path: project.data.path,
            http_url_to_repo: project.data.http_url_to_repo
          }

        } catch (error) {
          this.logger.warn(`Aviso: Nenhuma projeto encontrado. ${error}`);
          throw new NotFoundError("Nenhum projeto encontrado");
        }

  }
}