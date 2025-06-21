import type { FastifyTypedInstance } from "../shared/types";
import { randomUUID } from "node:crypto";
import { z } from "zod";


interface User {
  id: string
  name: string
  enail: string
}

const users = []

function routes (fastify: FastifyTypedInstance, options: any, done: () => void) {

  fastify.get("/", {
    schema: {
      tags: ["Users"],
      description: "Lista todos os usuários",
    }
  },
    async () => {
    return [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
  });

  fastify.post("/", {
      schema: {
        tags: ["Users"],
        description: 'Cria um novo usuário',
        body: z.object({
          name: z.string().min(1, "É necessário informar o nome"),
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as { name: string; email: string };

      users.push({
        id: randomUUID(),
        name,
        email,
      })

      return reply.status(201).send({message: "Usuário criado com sucesso"});
    });

  done();
}

export default routes;