import { ExpenseInstallmentsModel } from "../../domain/models/expense_installments_model"


export interface IExpensesInstallmentsRepository {
    createInstallmentsExpense(expense: ExpenseInstallmentsModel): Promise<any>
    getInstallmentsExpense(userId: number): Promise<any>
}