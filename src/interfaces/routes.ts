import { UserService } from "../domain/user.service";
import type { FastifyTypedInstance } from "../shared/types";
import { z } from "zod";

const userService = new UserService()

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
      userService.insert(request, reply);
    });

  fastify.get("/list", {
      schema: {
        tags: ["Users"],
        description: 'Lista todos os usuários',
      },
    },
    async (request, reply) => {
      userService.insert(request, reply);
    });

  done();
}

export default routes;