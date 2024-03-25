import fastify from "fastify";
import AuthRoutes from "./routes/authRoutes";

const app = fastify();

app.register(AuthRoutes);

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running on port 3000");
});
