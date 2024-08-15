import { PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "./i_user_repository";
import { UserModel } from "../../../domain/models/user_model";



export class UserRepository implements IUserRepository {

    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }

    createUser(user: UserModel): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getUser(id: number): Promise<any> {
        const result = await this.prismaDB.user.findUnique({ where: { id: id }, include: { fiance_config: true } })
        return result as User
    }
}