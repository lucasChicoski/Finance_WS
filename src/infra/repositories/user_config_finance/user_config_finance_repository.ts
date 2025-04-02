import { PrismaClient } from "@prisma/client";
import { FinanceConfigModel } from "../../../domain/models/finance_config_model";
import { IUserConfigFinanceRepository } from "./i_user_config_finance_repository";



export class UserConfigFinanceRepository implements IUserConfigFinanceRepository {

    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }

    async getFinanceConfig(userId: number): Promise<any> {
        const result = await this.prismaDB.financeConfig.findUnique({ where: { user_id: userId } })

        return result

    }
    async createFinanceConfig(value: FinanceConfigModel): Promise<any> {
        const result = await this.prismaDB.financeConfig.create({
            data: {
                balance: value.balance,
                guarde_dinheiro: value.guardeDinheiro,
                renda: value.renda,
                user_id: value.userId
            }
        })

        return result
    }
    async upateFinanceConfig(value: FinanceConfigModel): Promise<any> {
        const result = await this.prismaDB.financeConfig.update({
            where: { user_id: value.userId }, data: {
                balance: value.balance,
                guarde_dinheiro: value.guardeDinheiro,
                renda: value.renda,
            }
        })

        return result
    }
}