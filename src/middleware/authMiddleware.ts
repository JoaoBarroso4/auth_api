import { FastifyRequest, FastifyReply } from "fastify";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../config/jwt";

interface RequestWithUser extends FastifyRequest {
  user?: string | JwtPayload;
}

export async function authPreHandler(
  request: RequestWithUser,
  reply: FastifyReply,
) {
  const token = request.headers.authorization;
  if (!token) {
    reply.code(401).send("Access Denied");
    return;
  }

  try {
    request.user = verifyToken(token);
  } catch (err) {
    reply.code(400).send("Invalid Token");
  }
}
