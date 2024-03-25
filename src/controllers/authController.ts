import * as AuthService from "../services/authService";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchema } from "../validators/userValidator";
import { z } from "zod";
import { validateToken } from "../validators/tokenValidator";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const parsedBody = UserSchema.parse(request.body);
    const user = await AuthService.registerUser(parsedBody);
    reply.status(201).send({
      id: user.id,
      email: user.email,
      username: user.username,
    });
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

export async function getUserByUsername(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    validateToken(request, reply);

    const paramsSchema = z.object({
      username: z.string(),
    });
    const parsedParams = paramsSchema.parse(request.params);

    const user = await AuthService.getUserByUsername(parsedParams.username);
    reply.status(200).send({
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    }
  }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    validateToken(request, reply);

    const UpdateUserSchema = UserSchema.partial();
    const parsedBody = UpdateUserSchema.parse(request.body);

    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const parsedParams = paramsSchema.parse(request.params);

    const user = await AuthService.updateUser(parsedParams.id, parsedBody);
    reply.status(200).send({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    }
  }
}

export async function deleteUserByUsername(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    validateToken(request, reply);

    const paramsSchema = z.object({
      username: z.string(),
    });
    const parsedParams = paramsSchema.parse(request.params);

    await AuthService.deleteUserByUsername(parsedParams.username);
    reply.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    }
  }
}
