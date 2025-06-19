import { PrismaClient } from "@prisma/client";
import {  IExpensesRepository } from "./i_expenses_repository";
import { ExpenseModel } from "../../../domain/models/expense_model";
import { ExpenseUpdateDTO } from "../../../domain/DTO/update_expese";


export class ExpensesRepository implements IExpensesRepository {


    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }
    async createExpnese(expense: ExpenseModel): Promise<any> {

        const result = await this.prismaDB.despesas.create({

            data: {
                date: expense.data,
                descricao_despesa: expense.descricao,
                hash: expense.hash,
                is_divided: expense.isDivided,
                month: expense.month,
                parcela: expense.parcela,
                quantidade_parcela: expense.quantidade_parcela,
                tipo_despesa: expense.tipoDespesa,
                valor_gasto: expense.valorGasto,
                id_despesas_parceladas: expense.idDespesaParcelada,
                id_user: expense.idUser,
                year: expense.year,
                id_category: expense.idCategory
            }
        })

        return result
    }
    async updateExpnese(expense: ExpenseUpdateDTO): Promise<any> {
        const result = await this.prismaDB.despesas.update({
            where: { hash: expense.hash },
            data: {
                valor_gasto: expense.valor_gasto,
                parcela: expense.valor_gasto,
                descricao_despesa: expense?.descricao
            }
        })
        return result
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