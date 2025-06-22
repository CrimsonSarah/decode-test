import { randomUUID } from "node:crypto";

export class UserService {
    private users: { id: string; name: string; email: string }[] = [];
    
    constructor() {
    }

    insert(req:any, reply:any) {
        const { name, email } = req.body as { name: string; email: string };

        this.users.push({
            id: randomUUID(),
            name,
            email,
        })

        return reply.status(201).send({message: "Usuário criado com sucesso"});
    }

    update(req:any, reply:any) {
        const { id } = req.params as { id: string };
        const { name, email } = req.body as { name: string; email: string };

        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return reply.status(404).send({ message: "Usuário não encontrado" });
        }

        this.users[userIndex] = { id, name, email };
        return reply.status(200).send({ message: "Usuário atualizado com sucesso" });
    }

    list(reply:any) {
        return reply.status(200).send(this.users, this.users.length);
    }

    delete(req:any, reply:any) {
        const { id } = req.params as { id: string };

        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return reply.status(404).send({ message: "Usuário não encontrado" });
        }

        this.users.splice(userIndex, 1);
        return reply.status(200).send({ message: "Usuário deletado com sucesso" });
    }
}