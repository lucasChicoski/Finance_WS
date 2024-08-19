import { PrismaClient } from "@prisma/client";
import { ICategoryRepository } from "./i_category_repository";


export class CategoryRepository implements ICategoryRepository {
    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }
    async getCategories(): Promise<any> {

        const result = await this.prismaDB.categoryExpenses.findMany()
        return result
    }

}