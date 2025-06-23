import { PrismaClient } from "../generated/prisma";

export class TaskService {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async insert(req:any, reply:any) {
        const { userId, description, status } = req.body as {  userId: number; description: string; status: string };
    
        const userExists = await this.prisma.user.findUnique({
            where: { id: userId }
        }).catch((error) => {
            console.error("Erro ao buscar usuário:", error);
        });

        const task = await this.prisma.task.create({
            data: {
                userId,
                description,
                status
            }
        }).catch((error) => {
            console.error("Erro ao inserir tarefa:", error);
        })

        return reply.status(201).send({message: "Tarefa criada com sucesso", task});
    }

    async update(req:any, reply:any) {
        const { id } = req.params as { id: string };
        const { userId, description, status } = req.body as {  userId: number; description: string; status: string };

        const taskExists = await this.prisma.task.findUnique({
            where: { id: Number(id) }
        }).catch((error) => {
            console.error("Erro ao buscar tarefa:", error);
        });

        const task = await this.prisma.task.update({
            where: {
                id: Number(id),
            },
            data: {
                userId,
                description,
                status
            }
        }).catch((error) => {
            console.error("Erro ao atualizar tarefa:", error);
        })


        return reply.status(200).send({ message: "Tarefa atualizada com sucesso", task});
    }

    async complete(req:any, reply:any) {
        const { id } = req.params as { id: string };

        const taskExists = await this.prisma.task.findUnique({
            where: { id: Number(id) }
        }).catch((error) => {
            console.error("Erro ao buscar tarefa:", error);
        });

        const task = await this.prisma.task.update({
            where: {
                id: Number(id),
            },
            data: {
                "status": "COMPLETED"
            }
        }).catch((error) => {
            console.error("Erro ao atualizar tarefa:", error);
        })

        return reply.status(200).send({ message: "Tarefa marcada como concluída", task});
    }

    async list(reply:any) {
        const tasks = await this.prisma.task.findMany().catch((error) => {
            console.error("Erro ao listar tarefas:", error);
        });
        return reply.status(200).send(tasks);
    }

    async searchByUser(reply:any) {
        const { userId } = reply.request.params as { userId: string };

        const userExists = await this.prisma.user.findUnique({
            where: {  id: Number(userId) }
        }).catch((error) => {
            console.error("Erro ao buscar usuário:", error);
        });

        const tasks = await this.prisma.task.findMany({
            where: { userId: Number(userId) }
        }).catch((error) => {
            console.error("Erro ao buscar tarefas por usuário:", error);
        });

        return reply.status(200).send(tasks);
    }

    async searchByStatus(reply:any) {
        const { status } = reply.request.params as { status: string };

        const tasks = await this.prisma.task.findMany({
            where: { status}
        }).catch((error) => {
            console.error("Erro ao buscar tarefas por status:", error);
        });

        return reply.status(200).send(tasks);
    }

    async delete(req:any, reply:any) {
        const { id } = req.params as { id: string };

        const taskExists = await this.prisma.task.findUnique({
            where: {  id: Number(id) }
        }).catch((error) => {
            console.error("Erro ao buscar tarefa:", error);
        });

        const task = await this.prisma.task.delete({
            where: { id: Number(id) }
            }).catch((error) => {
                console.error("Erro ao deletar tarefa:", error);})

        return reply.status(200).send({ message: "Tarefa deletada com sucesso" });
    }
}