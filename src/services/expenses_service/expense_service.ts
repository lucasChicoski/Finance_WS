import { Despesas, FinanceConfig } from "@prisma/client";
import { ExpenseModel } from "../../domain/models/expense_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { ExpensesRepository } from "../../infra/repositories/expenses/expenses_repository";
import { agrupadorDespesas } from "../../utils/agrupadores/agrupador-despesas";
import { IExpensesService } from "./i_expense_service";
import { IUserConfigFinanceService } from "../user_config_finance_service/i_user_config_finance_service";


export class ExpenseService implements IExpensesService {
    expenseRepo: ExpensesRepository
    configUserRepo: IUserConfigFinanceService

    constructor() {
        this.expenseRepo = RepositoryFactory.getRepository(RepositoryTtype.Expense)
        this.configUserRepo = RepositoryFactory.getRepository(RepositoryTtype.FinanceConfig)
    }
    async createExpense(expense: ExpenseModel, calculateBalance: boolean): Promise<any> {
        const result: Despesas = await this.expenseRepo.createExpnese(expense)
        return result
    }
    async updateExpense(expense: ExpenseModel): Promise<any> {
        const result = await this.expenseRepo.updateExpnese(expense)
    }
    async getExpense(userId: number): Promise<any> {
        const result = await this.expenseRepo.getExpense(userId)

        return Object.values(agrupadorDespesas(result));
    }
    async deleteExpense(hash: string): Promise<any> {
        const result: Despesas = await this.expenseRepo.deleteExpense(hash)
        await this.configUserRepo.getFinanceConfig(1)
        return result
    }
}