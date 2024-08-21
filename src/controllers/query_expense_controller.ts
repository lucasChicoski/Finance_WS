import { Request, Response } from "express";
import { QueryExpensesService } from "../services/chart_query/expense_query/query_expense_service";
import { QueryExpensesModel } from "../domain/models/query_expense_model";
import { StatusReq } from "../global/status_req";



export class QueryExpensesController {


    queryExpensesService: QueryExpensesService

    constructor(value: QueryExpensesService) {
        this.queryExpensesService = value
    }



    async getExpenseGroupByCategoryExpense(req: Request, res: Response): Promise<any> {
        const body = req.body

        const filter = QueryExpensesModel.fromJson(body)
        const response = await this.queryExpensesService.getExpenseGroupByCategoryExpense(filter)

        return res.json(StatusReq.response('200', response, 'Busca realizada com sucesso')) // response
    }
}