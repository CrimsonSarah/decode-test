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

    update() {
    }

    list(reply:any) {
        return reply.status(200).send({
            users: this.users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
            })),
        } 
        );
    }

    delete() {
    }
}