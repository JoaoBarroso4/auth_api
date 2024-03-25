import fastify from "fastify";

const app = fastify();

// Usage in a route
// app.route({
//   method: 'GET',
//   url: '/protected',
//   preHandler: authPreHandler,
//   handler: async (request, reply) => {
//     // Your route handler here
//   }
// });

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running on port 3000");
});
