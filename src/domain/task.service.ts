import { randomUUID } from "node:crypto";

export class TaskService {
    private tasks: { id: string; description: string; user: string; status: string }[] = [];
    
    constructor() {
    }

    insert(req:any, reply:any) {
        const { description, user, status } = req.body as { description: string; user: string; status: string };

        this.tasks.push({
            id: randomUUID(),
            description,
            user,
            status,
        })

        return reply.status(201).send({message: "Usuário criado com sucesso"});
    }

    update(req:any, reply:any) {
        const { id } = req.params as { id: string };
        const { description, user, status } = req.body as { description: string; user: string, status: string };

        const tasksIndex = this.tasks.findIndex(tasks => tasks.id === id);
        if (tasksIndex === -1) {
            return reply.status(404).send({ message: "Tarefa não encontrada" });
        }

        this.tasks[tasksIndex] = { id, description, user, status };
        return reply.status(200).send({ message: "Tarefa atualizada com sucesso" });
    }

    list(reply:any) {
        return reply.status(200).send(this.tasks, this.tasks.length);
    }

    delete(req:any, reply:any) {
        const { id } = req.params as { id: string };

        const tasksIndex = this.tasks.findIndex(task => task.id === id);
        if (tasksIndex === -1) {
            return reply.status(404).send({ message: "Tarefa não encontrada" });
        }

        this.tasks.splice(tasksIndex, 1);
        return reply.status(200).send({ message: "Tarefa deletada com sucesso" });
    }
}