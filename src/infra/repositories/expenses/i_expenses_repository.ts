import { ExpenseModel } from "../../../domain/models/expense_model"
import { ExpenseUpdateDTO } from "../../../domain/DTO/update_expese"



export interface IExpensesRepository {
    createExpnese(expense: ExpenseModel): Promise<any>
    updateExpnese(expense: ExpenseUpdateDTO): Promise<any>
    getExpense(userId: number): Promise<any>
    deleteExpense(hash: string): Promise<any>
}
