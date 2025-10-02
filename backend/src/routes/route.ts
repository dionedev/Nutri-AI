import type { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  app.post("/plan", async (request, reply) => {
    return reply.send("Rota plano de dieta");
  });
}
