import { PrismaClient } from "@prisma/client";
import { IExpensesRepository } from "./i_expenses_repository";
import { ExpenseModel } from "../../../domain/models/expense_model";


export class ExpensesRepository implements IExpensesRepository {


    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }
    async createExpnese(expense: ExpenseModel): Promise<any> {

        const result = await this.prismaDB.despesas.create({

            data: {
                date: expense.date,
                descricao_despesa: expense.descricaoDespesa,
                hash: expense.hash,
                is_divided: expense.isDivided,
                month: expense.month,
                parcela: expense.parcela,
                prestacoes: expense.prestacoes,
                tipo_despesa: expense.tipoDespesa,
                valor_gasto: expense.valorGasto,
                id_despesas_parceladas: expense.expenseInstallmentId,
                id_user: expense.userId,
                year: expense.year,
                id_category: expense.categoryId
            }
        })

        return result
    }
    updateExpnese(expense: ExpenseModel): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getExpense(userId: number): Promise<any> {
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1

        const result = await this.prismaDB.despesas.findMany({
            where: {
                id_user: userId, AND: {
                    month: {
                        lte: currentMonth
                    },
                    year: currentYear
                },
            }, orderBy: {
                date: 'desc'
            }
        },)
        return result
    }
    async deleteExpense(hash: string): Promise<any> {
        const result = await this.prismaDB.despesas.delete({ where: { hash: hash } })
        return result
    }

}