import { ExpenseModel } from "../../../domain/models/expense_model"



export interface IExpensesRepository {
    createExpnese(expense: ExpenseModel): Promise<any>
    updateExpnese(expense: ExpenseModel): Promise<any>
    getExpense(userId: number): Promise<any>
    deleteExpense(hash: string): Promise<any>
}