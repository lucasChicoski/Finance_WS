import { ExpenseInstallmentsModel } from "../../../domain/models/expense_installments_model"


export interface IExpensesInstallmentsRepository {
    getInstallmentsExpense(userId: number): Promise<any>
    createInstallmentsExpense(expense: ExpenseInstallmentsModel): Promise<any>
}