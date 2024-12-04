import { PrismaClient } from "@prisma/client";
import AuthDTO from "../../../domain/DTO/auth_DTO";
import IAuthRepository from "./i_auth_repository";



export class AuthRepository implements IAuthRepository {
    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }
    async login(user: AuthDTO): Promise<any> {

        try {
            const result = await this.prismaDB.user.findUnique({
                where: {
                    cpf: user.cpf, AND: { password: user.passwd }
                },
                select: {
                    id: false,
                    email: true,
                    password: false,
                    nome: true,
                    sobrenome: true,
                    cpf: true
                },
            })
            return result
        } catch (error) {
            const x = error as Error
            throw new Error(x.message)
        }
    }
}