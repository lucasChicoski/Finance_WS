import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "./i_user_repository";
import { UserModel } from "../../../domain/models/user_model";



export class UserRepository implements IUserRepository {

    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }

    async createUser(user: UserModel): Promise<any> {
        const result = await this.prismaDB.user.create({
            data: {
                email: user.email,
                password: user.passwd,
                nome: user.name,
                sobrenome: user.lastName,
                cpf: user.cpf,
            }
        });

        return result as User
    }

    async getUser(id: number): Promise<any> {
        const result = await this.prismaDB.user.findUnique({ where: { id: id }, include: { finance_config: true } })
        return result as User
    }
}