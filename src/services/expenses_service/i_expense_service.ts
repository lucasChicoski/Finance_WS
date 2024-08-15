import {ExpenseModel } from "../../domain/models/expense_model"

export interface IExpensesService {
    createExpense(expense: ExpenseModel): Promise<any>
    updateExpense(expense: ExpenseModel): Promise<any>
    getExpense(userId: number): Promise<any>
    deleteExpense(hash: string): Promise<any>
}