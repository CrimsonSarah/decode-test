import { id } from "zod/v4/locales";
import { TaskService } from "../domain/task.service";
import type { FastifyTypedInstance } from "../shared/types";
import { z } from "zod";
import { stat } from "fs";

const taskService = new TaskService()

function routes (fastify: FastifyTypedInstance, options: any, done: () => void) {

  fastify.get("/", {
    schema: {
      tags: ["Tasks"],
      description: 'Lista todas as tarefas',
    },
  },
  async (request, reply) => {
    await taskService.list(reply);
  });

  fastify.get("/search/byUser/:userId", {
    schema: {
      tags: ["Tasks"],
      description: 'Lista todas as tarefas associadas a um usuário',
    },
  },
  async (request, reply) => {
    await taskService.searchByUser(reply);
  });

  fastify.get("/search/byStatus/:status", {
    schema: {
      tags: ["Tasks"],
      description: 'Lista todas as tarefas cujo status é igual ao parâmetro passado',
    },
  },
  async (request, reply) => {
    await taskService.searchByStatus(reply);
  });

  fastify.post("/", {
      schema: {
        tags: ["Tasks"],
        description: 'Cria uma nova tarefa',
        body: z.object({
          userId: z.number().int().positive("O ID do usuário deve ser um número inteiro positivo"),
          description: z.string().min(1, "É necessário informar a descrição da tarefa"),
          status: z.string().min(1, "É necessário informar o status da tarefa"),
        }),
      },
    },
    async (request, reply) => {
      await taskService.insert(request, reply);
    });

  fastify.post("/update/:id", {
      schema: {
        tags: ["Tasks"],
        description: 'Atualiza uma tarefa',
        body: z.object({
          userId: z.number().int().positive("O ID do usuário deve ser um número inteiro positivo"),
          description: z.string().min(1, "É necessário informar a descrição da tarefa"),
          status: z.string().min(1, "É necessário informar o status da tarefa"),
        }),
      },
    },
    async (request, reply) => {
      await taskService.update(request, reply);
    });

  fastify.post("/complete/:id", {
      schema: {
        tags: ["Tasks"],
        description: 'Marca uma tarefa como concluída',
      },
    },
    async (request, reply) => {
      await taskService.complete(request, reply);
    });

    fastify.post("/delete/:id", {
      schema: {
        tags: ["Tasks"],
        description: 'Remove uma tarefa',
      },
    },
    async (request, reply) => {
      await taskService.delete(request, reply);
    });

  done();
}

export default routes;