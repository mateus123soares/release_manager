import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export function registerErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);

  const statusCode = error.statusCode ?? 500;

  reply.status(statusCode).send({
    error: error.name,
    message: error.message,
  });
}
