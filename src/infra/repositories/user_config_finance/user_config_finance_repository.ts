import { Despesas, FinanceConfig, PrismaClient } from "@prisma/client";
import { FinanceConfigModel } from "../../../domain/models/finance_config_model";
import { IUserConfigFinanceRepository } from "./i_user_config_finance_repository";

export class UserConfigFinanceRepository implements IUserConfigFinanceRepository {

    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }

    async getFinanceConfig(userId: number): Promise<any> {
        await this.calculateBalance(userId)

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
    
    //Calcular o balanço do mês atual.
    private async calculateBalance(id_user: number): Promise<number> {
        // Balanço = Total Que ganha - Total Que gasto no mês
        let total_gasto = 0
        let balanco = 0

        const reusltDespesas: Despesas[] = await this.prismaDB.despesas.findMany({
            where: {
                month: new Date().getMonth() + 1,
                AND: {
                    id_user: id_user
                }
            }
        })

        const reusltConfigUser = await this.prismaDB.financeConfig.findUnique({ where: { user_id: id_user } }) as FinanceConfig
        
        reusltDespesas.map((element) => {
            total_gasto += element.valor_gasto
        })  

        if(reusltConfigUser.renda){
            balanco = reusltConfigUser.renda - total_gasto
        }

        //Atualizar balanço
        await this.prismaDB.financeConfig.update({
            where: { user_id: id_user }, data: {
                balance: balanco
            }
        })

        return balanco
    }
}