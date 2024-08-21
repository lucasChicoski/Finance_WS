import { QueryExpensesModel } from "../../../../domain/models/query_expense_model";



export interface IQueryExpenses {
    getExpenseGroupByCategoryExpense(value: QueryExpensesModel): Promise<any>
}