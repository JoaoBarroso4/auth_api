import * as AuthService from "../services/authService";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchema } from "../validators/userValidator";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const parsedBody = UserSchema.parse(request.body);
    const user = await AuthService.registerUser(parsedBody);
    reply.status(201).send(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    }
  }
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const requestSchema = UserSchema.omit({ username: true });
    const { email, password } = requestSchema.parse(request.body);

    const { token } = await AuthService.login(email, password);

    reply.status(200).send(JSON.stringify(token));
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    }
  }
}
