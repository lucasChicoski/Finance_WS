import { QueryExpensesDTO } from "../DTO/query_expense_DTO"



export class QueryExpensesModel {
    userId: number
    month?: number

    constructor(value: QueryExpensesDTO) {
        this.month = value?.month ?? new Date().getMonth() + 1
        this.userId = value.userId
    }

    static fromJson(json: any) {
        return new QueryExpensesModel({
            month: json?.month,
            userId: json.user_id
        })
    }
}
