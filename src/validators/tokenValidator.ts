import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../config/jwt";

export function validateToken(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization;
  if (!token) {
    reply.status(401).send({ error: "Unauthorized" });
    return;
  }
  const isTokenValid = verifyToken(token);
  if (!isTokenValid) {
    reply.status(401).send({ error: "Unauthorized" });
    return;
  }
}
