import config from '@config/config.js';

import fastify from './app.js';

fastify.listen({ port: config.port }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  //fastify.log.info(`server listening on ${address}`)
});
