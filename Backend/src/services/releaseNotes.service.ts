import fs from 'fs';
import path from 'path';
import fastify from '../app.js';
import axios from 'axios';
import parseDate from '../utils/date.js'
import gitlab from '@config/gitlab.js';

import type {AxiosRequestConfig} from 'axios';
import type {ReleaseNote} from 'src/types/releaseNotes.js'
import type {GitLabCommit, GitLabCommitParsed} from 'src/types/gitlab.js'

export class ReleaseNoteService {

  async getLastTag(projectID: number) {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${gitlab.host}/api/v4/projects/${projectID}/repository/tags`,
        headers: {
          'PRIVATE-TOKEN': `${gitlab.token}`,
        },
        params: {
          order_by: 'updated',
          sort: 'desc',
          per_page: 2,
        },
      };
      const tag = await axios.request(axiosConfig);
      return tag.data[1].commit.created_at

    } catch (error) {
      fastify.log.warn(`Aviso: Nenhuma tag encontrada. Analisando todos os commits. ${error}`);
      return null;
    }
  }

  async getCommitsSinceLastTag(branchName: string | null, tagCommitDate: string | null, projectID: number) : Promise<GitLabCommit[]> {
      const commitsConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${gitlab.host}/api/v4/projects/${projectID}/repository/commits`,
        headers: {
          'PRIVATE-TOKEN': `${gitlab.token}`,
        },
        params: {
          ref_name: branchName,
          since: tagCommitDate,
        },
      };
    
    try {
      const commitsResponse = await axios.request<GitLabCommit[]>(commitsConfig);
      return commitsResponse.data

    } catch (error: unknown) {
        if (error instanceof Error) {
              fastify.log.error("Erro: A última tag não existe ou o repositório está vazio. Verifique se há commits.");
          throw error;
      }
    }
  }

  parserCommit(commitList: GitLabCommit[]): GitLabCommitParsed[] {

    const commits = commitList.map(commit => {
      return ({
        "id": commit.short_id,
        "title": commit.title,
        "message": commit.message,
        "author_email": commit.author_email,
        "created_at": parseDate(commit.created_at)
      })
    })

    return commits
  }

  generateReleaseNote(parsedCommits: GitLabCommitParsed[], filename: string, outputDir: string, metadata: ReleaseNote){
      const filePath = path.resolve(outputDir, filename);
      const fileStream = fs.createWriteStream(filePath);

      fileStream.write('# Notas de Lançamento\n\n');
      fileStream.write(`## ${metadata.project}\n\n`);
      fileStream.write(`### Release: ${metadata.release}\n\n`);
      fileStream.write(`${metadata.resume}\n\n`);
      fileStream.write('### Commits Realizados\n\n');

      parsedCommits.forEach((commit: GitLabCommitParsed) => {
        const text: string = `
  - **${commit.title}** (${commit.id}) por ${commit.author_email} em ${commit.created_at}
    - Mensagem: ${commit.message}
        `
        fileStream.write(`${text}\n`);
      });

      fileStream.end(); // Fecha o stream após a escrita
      fastify.log.error(`Notas de lançamento salvas em: ${filePath}`);
  }

// Lógica principal
  async generateReleaseNotes(metadata: ReleaseNote) {
 
    const lastTag = await this.getLastTag(metadata.projectID);
    const commits = await this.getCommitsSinceLastTag(metadata.branch,lastTag,metadata.projectID);
    const parsedCommits = this.parserCommit(commits)
    const path = process.env.RELEASE_NOTES_PATH || 'public'

    this.generateReleaseNote(parsedCommits,`release_notes_${metadata.project}.md`,path,metadata)

  }
}