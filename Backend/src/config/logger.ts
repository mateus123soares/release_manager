import type { FastifyBaseLogger } from 'fastify';

import type { Logger } from 'src/types/error.js';

export class FastifyLogger implements Logger {
  constructor(private readonly logger: FastifyBaseLogger) {}

  info(message: string, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }
  error(message: string, ...args: unknown[]) {
    this.logger.error(message, ...args);
  }
  warn(message: string, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }
}
