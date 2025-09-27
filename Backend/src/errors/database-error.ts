import { BadRequestError } from './http-error.js';

interface PgError extends Error {
  code?: string;
  column?: string;
}

class DatabaseError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message || 'Erro de banco de dados');
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

export function handleDatabaseError(err: PgError): never {
  switch (err.code) {
    case '42P01': // tabela não existe
      throw new DatabaseError('Tabela não encontrada no banco');
    case '42703': // coluna não existe
      throw new DatabaseError('Coluna inválida na query');
    case '23505': // duplicidade (unique constraint)
      throw new BadRequestError('Registro já existe');
    case '23503': // foreign key
      throw new BadRequestError('Registro pai não existe');
    case '23502': // not null
      throw new BadRequestError(
        `Campo obrigatório faltando: ${err.column || 'desconhecido'}`,
      );
    default:
      throw new DatabaseError(err.message || 'Erro desconhecido no banco');
  }
}
