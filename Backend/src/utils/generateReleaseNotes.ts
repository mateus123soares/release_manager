import { execSync } from "child_process";
import fs from 'fs';
import path from 'path';
import fastify from '../app.js';

import type {releaseNote} from 'src/types/releaseNotes.js'

const COMMIT_CATEGORIES = {
  'feat': '🚀 Novas funcionalidades',
  'fix': '🐞 Correções de bugs',
  'docs': '📝 Documentação',
  'refactor': '🔨 Refatoração',
  'style': '🎨 Estilização',
  'chore': '🔧 Tarefas internas',
  'test': '🧪 Testes',
  'perf': '⚡ Melhorias de performance',
  'ci': '🤖 CI/CD'
};

function runCommand(command: string) {
  try {
    return execSync(command, { encoding: 'utf-8' }).trim();
  } catch (error: any) {
    // Se o comando falhar, lança um erro com a mensagem de erro do stdout/stderr
    throw new Error(`Erro ao executar o comando: ${command}\n${error.stdout || error.stderr}`);
  }
}

function getLastTag() {
  try {
    const lastTag = runCommand('git describe --tags --abbrev=0');
    return lastTag;
  } catch (error) {
    fastify.log.warn('Aviso: Nenhuma tag encontrada. Analisando todos os commits.');
    return null;
  }
}

function getCommitsSinceLastTag(lastTag: string | null) {
  const commitRange = 'HEAD';
  //const commitRange = lastTag ? `${lastTag}..HEAD` : 'HEAD';
  
  let commitsLog = '';
  try {
    commitsLog = runCommand(`git log --no-merges --format="%H--%s--%b" ${commitRange}`);
  } catch (error: any) {
    if (error.message.includes('fatal: bad revision')) {
        fastify.log.error("Erro: A última tag não existe ou o repositório está vazio. Verifique se há commits.");
        process.exit(1);
    }
    throw error;
  }

  return commitsLog;
}

function parserCommit(commitList: string) {
  // Use a string.split() to create an array of commits.
  const commits = commitList.split('\n');

  // Use the reduce() method to transform the array.
  const commitsParsed = commits.reduce((accumulator, currentCommit) => {
    // Check for empty strings from splitting the list
    if (!currentCommit) {
      return accumulator;
    }

    // Split the commit into hash and message parts
    let [hash, ...rest] = currentCommit.split('--');
    
    // Join the rest of the message and remove the last two characters
    let message = rest.join('--').slice(0, -2);
    
    // Push the parsed string into the accumulator array
    accumulator.push(`${hash?.slice(0, 8)} - ${message}`);

    // Return the accumulator for the next iteration
    return accumulator;
  }, []); // Initialize the accumulator as an empty array []

  return commitsParsed
}

function generateReleaseNote(parsedCommits: string[], filename: string, outputDir: string, metadata: releaseNote){
    const filePath = path.resolve(outputDir, filename);
    const fileStream = fs.createWriteStream(filePath);

    fileStream.write('# Notas de Lançamento\n\n');
    fileStream.write(`## ${metadata.project}\n\n`);
    fileStream.write(`### Release: ${metadata.release}\n\n`);
    fileStream.write(`${metadata.resume}\n\n`);
    fileStream.write('### Commits Realizados\n\n');

    parsedCommits.forEach((commit) => {
      fileStream.write(`- ${commit}\n`);
    });

    fileStream.end(); // Fecha o stream após a escrita
    fastify.log.error(`Notas de lançamento salvas em: ${filePath}`);
}

// Lógica principal
export default function generateReleaseNotes() {
  const resume = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  
  const metadata : releaseNote = {
    "project": "Teste",
    "resume": resume,
    "release": "v1.0.0",
  }
  
  const lastTag = getLastTag();
  const commits = getCommitsSinceLastTag(lastTag);
  const parsedCommits = parserCommit(commits)
  generateReleaseNote(parsedCommits,`release_notes_${metadata.project}.md`,process.env.RELEASE_NOTES_PATH,metadata)
  
}