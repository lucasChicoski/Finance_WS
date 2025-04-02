import { ExpenseModel } from "../../domain/models/expense_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { ExpensesRepository } from "../../infra/repositories/expenses/expenses_repository";
import { IExpensesService } from "./i_expense_service";


export class ExpenseService implements IExpensesService {
    expenseRepo: ExpensesRepository

    constructor() {
        this.expenseRepo = RepositoryFactory.getRepository(RepositoryTtype.Expense)
    }
    async createExpense(expense: ExpenseModel): Promise<any> {

        

        const result = await this.expenseRepo.createExpnese(expense)
        return result
    }
    async updateExpense(expense: ExpenseModel): Promise<any> {
        const result = await this.expenseRepo.updateExpnese(expense)
    }
    async getExpense(userId: number): Promise<any> {
        const result = await this.expenseRepo.getExpense(userId)
        return result
    }
    async deleteExpense(hash: string): Promise<any> {
        const result = await this.expenseRepo.deleteExpense(hash)
        return result
    }
}