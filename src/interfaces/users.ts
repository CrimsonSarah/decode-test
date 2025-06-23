import { id } from "zod/v4/locales";
import { UserService } from "../domain/user.service";
import type { FastifyTypedInstance } from "../shared/types";
import { z } from "zod";

const userService = new UserService()

function routes (fastify: FastifyTypedInstance, options: any, done: () => void) {

  fastify.get("/", {
    schema: {
      tags: ["Users"],
      description: 'Lista todos os usuários',
    },
  },
  async (request, reply) => {
    await userService.list(reply);
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
      await userService.insert(request, reply);
    });

  fastify.post("/update/:id", {
      schema: {
        tags: ["Users"],
        description: 'Atualiza um usuário',
        body: z.object({
          name: z.string().min(1, "É necessário informar o nome"),
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      await userService.update(request, reply);
    });

    fastify.post("/delete/:id", {
      schema: {
        tags: ["Users"],
        description: 'Remove um usuário',
      },
    },
    async (request, reply) => {
      await userService.delete(request, reply);
    });

  done();
}

export default routes;