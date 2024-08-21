import { QueryExpensesModel } from "../../../domain/models/query_expense_model";
import { RepositoryFactory, RepositoryTtype } from "../../../global/IOC";
import { IQueryExpenses } from "../../../infra/repositories/chart_query/query_expenses/i_query_expenses";
import { QueryExpensesRepository } from "../../../infra/repositories/chart_query/query_expenses/query_expenses";




export class QueryExpensesService implements IQueryExpenses {

    queryExpenseRepo: QueryExpensesRepository

    constructor() {
        this.queryExpenseRepo = RepositoryFactory.getRepository(RepositoryTtype.QueryExpense)
    }

    async getExpenseGroupByCategoryExpense(value: QueryExpensesModel): Promise<any> {

        const response = await this.queryExpenseRepo.getExpenseGroupByCategoryExpense(value)

        return response
    }
}