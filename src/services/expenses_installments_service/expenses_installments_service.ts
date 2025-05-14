import { ExpenseInstallmentsModel } from "../../domain/models/expense_installments_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { ExpensesRepository } from "../../infra/repositories/expenses/expenses_repository";
import { ExpensesInstallmentsRepository } from "../../infra/repositories/expenses_installments/expenses_installments_repository,";
import { calculoParcela } from "../../utils/scripts/calculo-parcela";
import { ExpenseService } from "../expenses_service/expense_service";
import { IExpensesService } from "../expenses_service/i_expense_service";
import { IExpensesInstallmentsRepository } from "./i_expenses_installments_service";



export class ExpensesInstallmentsService implements IExpensesInstallmentsRepository {
    expenseInstallmentsRepo: ExpensesInstallmentsRepository
    
    expenseService: IExpensesService
    constructor() {
        this.expenseInstallmentsRepo = RepositoryFactory.getRepository(RepositoryTtype.ExpenseInstallments)
        //É preciso uma Injeção de dependência
        this.expenseService = new ExpenseService()
    }
    
    async createInstallmentsExpense(expense: ExpenseInstallmentsModel): Promise<any> {
        const response = await this.expenseInstallmentsRepo.createInstallmentsExpense(expense)

        const listDespesasParceladas = calculoParcela({
            data: expense.data.toISOString(),
            idCategory: 1,
            idDespesasParceladas: response.id,
            quantidade_parcela: expense.quantidade_parcela,
            userId: expense.userId,
            valorTotal: expense.valorGasto
        })

        let index = 0;

        for (const despesa of listDespesasParceladas) {
            await this.expenseService.createExpense(despesa, (index == 0))        
            index++
        }

        return response
    }
    async getInstallmentsExpense(userId: number): Promise<any> {
        const response = await this.expenseInstallmentsRepo.getInstallmentsExpense(userId)
        return response
    }
}