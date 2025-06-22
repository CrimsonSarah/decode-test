import { TaskService } from "../domain/task.service";
import type { FastifyTypedInstance } from "../shared/types";
import { z } from "zod";

const taskService = new TaskService()

function routes (fastify: FastifyTypedInstance, options: any, done: () => void) {

  fastify.post("/", {
        schema: {
          tags: ["Tasks"],
          description: 'Cria uma nova tarefa',
          body: z.object({
            description: z.string().min(1, "É necessário informar a descrição"),
            user: z.string().min(1, "É necessário informar o usuário"),
            status: z.string().min(1, "É necessário informar o status"),
          }),
        },
      },
      async (request, reply) => {
        taskService.insert(request, reply);
      });
  
    fastify.get("/", {
        schema: {
          tags: ["Tasks"],
          description: 'Lista todas as tarefas',
        },
      },
      async (request, reply) => {
        taskService.list(reply);
      });

      fastify.post("/update", {
            schema: {
              tags: ["Tasks"],
              description: 'Atualiza uma tarefa',
              body: z.object({
                id: z.string().uuid("ID inválido"),
                description: z.string().min(1, "É necessário informar a descrição"),
                user: z.string().min(1, "É necessário informar o usuário"),
                status: z.string().min(1, "É necessário informar o status"),
              }),
            },
          },
          async (request, reply) => {
            taskService.insert(request, reply);
          });
      
          fastify.post("/delete", {
            schema: {
              tags: ["Tasks"],
              description: 'Remove uma tarefa',
              body: z.object({
                id: z.string().uuid("ID inválido")
              }),
            },
          },
          async (request, reply) => {
            taskService.insert(request, reply);
          });

  done();
}

export default routes;