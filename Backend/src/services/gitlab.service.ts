import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

import gitlab from '@config/gitlab.js';
import { NotFoundError } from '@errors/http-error.js';
import type { Logger } from 'src/types/error.js';

export class GitlabService {
  constructor(private logger: Logger) {}

  async getProjectById(projectID: number) {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${gitlab.host}/api/v4/projects/${projectID}`,
        headers: {
          'PRIVATE-TOKEN': `${gitlab.token}`,
        },
      };
      this.logger.info(`Info: buscando o projeto ${projectID} no Gitlab`);
      const project = await axios.request(axiosConfig);

      return {
        gitlab_id_project: projectID,
        path: project.data.path,
        http_url_to_repo: project.data.http_url_to_repo,
      };
    } catch (error) {
      this.logger.warn(`Aviso: Nenhuma projeto encontrado. ${error}`);
      throw new NotFoundError('Nenhum projeto encontrado');
    }
  }
}
