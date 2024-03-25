import * as AuthController from "../controllers/authController";
import { FastifyInstance } from "fastify";

export default function AuthRoutes(
  app: FastifyInstance,
  opts: any,
  done: Function,
) {
  // Register route
  app.post("/register", AuthController.register);

  // Login route
  app.post("/login", AuthController.login);

  // Get user by username
    app.get("/user/:username", AuthController.getUserByUsername);

  // Update user route
  app.put("/user/:id", AuthController.updateUser);

  // Delete user route
  app.delete("/user/:username", AuthController.deleteUserByUsername);

  done();
}
