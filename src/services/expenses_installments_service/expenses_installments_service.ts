import { ExpenseInstallmentsModel } from "../../domain/models/expense_installments_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { ExpensesInstallmentsRepository } from "../../infra/repositories/expenses_installments/expenses_installments_repository,";
import { calculoParcela } from "../../utils/scripts/calculo-parcela";
import { IExpensesInstallmentsRepository } from "./i_expenses_installments_service";



export class ExpensesInstallmentsService implements IExpensesInstallmentsRepository {
    expenseInstallmentsRepo: ExpensesInstallmentsRepository

    constructor() {
        this.expenseInstallmentsRepo = RepositoryFactory.getRepository(RepositoryTtype.ExpenseInstallments)
    }
    async createInstallmentsExpense(expense: ExpenseInstallmentsModel): Promise<any> {
        const response = await this.expenseInstallmentsRepo.createInstallmentsExpense(expense)
        const x = calculoParcela({
            data: expense.data.toISOString(),
            idCategory: 1,
            idDespesasParceladas: 1,
            quantidade_parcela: expense.quantidade_parcela,
            userId: 1,
            valorTotal: expense.valorGasto
        })
        return response
    }
    async getInstallmentsExpense(userId: number): Promise<any> {
        const response = await this.expenseInstallmentsRepo.getInstallmentsExpense(userId)
        return response
    }
}