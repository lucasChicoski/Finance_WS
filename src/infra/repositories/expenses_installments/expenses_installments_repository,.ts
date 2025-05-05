import { PrismaClient } from "@prisma/client"
import { IExpensesInstallmentsRepository } from "./i_expenses_installments_repository"
import { ExpenseInstallmentsModel } from "../../../domain/models/expense_installments_model"



export class ExpensesInstallmentsRepository implements IExpensesInstallmentsRepository {
    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }
    async getInstallmentsExpense(userId: number): Promise<any> {
        const response = await this.prismaDB.despesasParceladas.findMany({ where: { user_id: userId } })
        return response
    }
    
    async createInstallmentsExpense(expense: ExpenseInstallmentsModel): Promise<any> {
        const response = await this.prismaDB.despesasParceladas.create({
            data: {
                descricao_despesa: expense.descricaoDespesa,
                user_id: expense.userId,
                valor_gasto: expense.valorGasto,
                prestacoes: expense.quantidade_parcela,
                parcela: expense.parcela,
                date: expense.data
            }
        })

        return response
    }
}