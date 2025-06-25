import {ExpenseModel } from "../../domain/models/expense_model"
import { ExpenseUpdateType } from "../../infra/repositories/expenses/i_expenses_repository"

export interface IExpensesService {
    createExpense(expense: ExpenseModel, calculateBalance: boolean): Promise<any>
    updateExpense(expense: ExpenseUpdateType): Promise<any>
    getExpense(userId: number): Promise<any>
    deleteExpense(hash: string): Promise<any>
}