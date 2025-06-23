import { PrismaClient } from "../generated/prisma";

export class UserService {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async insert(req:any, reply:any) {
        const { name, email } = req.body as { name: string; email: string };
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
            }
        }).catch((error) => {
            console.error("Erro ao inserir usuário:", error);
        })

        return reply.status(201).send({message: "Usuário criado com sucesso", user});
    }

    async update(req:any, reply:any) {
        const { id } = req.params as { id: string };
        const { name, email } = req.body as { name: string; email: string };

        const userExists = await this.prisma.user.findUnique({
            where: {  id: Number(id) }
        }).catch((error) => {
            console.error("Erro ao buscar usuário:", error);
        });

        const user = await this.prisma.user.update({
            data:{
                name,
                email,
            },
            where: {
                id: Number(id),
            }
        })

        return reply.status(200).send({ message: "Usuário atualizado com sucesso", user});
    }

    async list(reply:any) {
        const users = await this.prisma.user.findMany().catch((error) => {
            console.error("Erro ao listar usuários:", error);
        });
        return reply.status(200).send(users);
    }

    async delete(req:any, reply:any) {
        const { id } = req.params as { id: string };

        const userExists = await this.prisma.user.findUnique({
            where: {  id: Number(id) }
        }).catch((error) => {
            console.error("Erro ao buscar usuário:", error);
        });

        const user = await this.prisma.user.delete({
            where: { id: Number(id) }
            }).catch((error) => {
                console.error("Erro ao deletar usuário:", error);})

        return reply.status(200).send({ message: "Usuário deletado com sucesso" });
    }
}