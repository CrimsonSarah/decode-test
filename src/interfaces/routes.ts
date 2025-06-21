import type { FastifyInstance } from "fastify";

function Routes (fastify: FastifyInstance, options: any, done: () => void) {
  fastify.get("/", async () => {
    return [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
  });

  done();
}

module.exports = Routes;