import type {FastifyReply, FastifyRequest } from "fastify";

export class IndexController {  
  async gethealth(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send({ status: "ok" });
  }
}