import { ExpenseInstallmentsModel } from "../../domain/models/expense_installments_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { ExpensesInstallmentsRepository } from "../../infra/repositories/expenses_installments/expenses_installments_repository,";
import { IExpensesInstallmentsRepository } from "./i_expenses_installments_service";



export class ExpensesInstallmentsService implements IExpensesInstallmentsRepository {
    expenseInstallmentsRepo: ExpensesInstallmentsRepository

    constructor() {
        this.expenseInstallmentsRepo = RepositoryFactory.getRepository(RepositoryTtype.ExpenseInstallments)
    }
    async createInstallmentsExpense(expense: ExpenseInstallmentsModel): Promise<any> {
        const response = await this.    expenseInstallmentsRepo.createInstallmentsExpense(expense)
        return response
    }
    async getInstallmentsExpense(userId: number): Promise<any> {
        const response = await this.expenseInstallmentsRepo.getInstallmentsExpense(userId)
        return response
    }
}