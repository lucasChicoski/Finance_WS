import { PrismaClient } from "@prisma/client"
import { IQueryExpenses } from "./i_query_expenses"
import { QueryExpensesModel } from "../../../../domain/models/query_expense_model"



export class QueryExpensesRepository implements IQueryExpenses {
    private prismaDB: PrismaClient

    constructor(prismaInstance: PrismaClient) {
        this.prismaDB = prismaInstance
    }
    async getExpenseGroupByCategoryExpense(value: QueryExpensesModel): Promise<any> {

        const result = await this.prismaDB.$queryRaw`
        select
            d.id_category as id_category ,
            SUM(valor_gasto) as total_gasto,
            ce.category as category_label,
            ce.colors as colors
        from "Despesas" d
        inner join "CategoryExpenses"
            ce ON d.id_category = ce.id 
        where
            d."month" = ${value.month} and d.id_user = ${value.userId}
        group by
            d.id_category, ce.category, ce.colors
        `

        return result
    }
}