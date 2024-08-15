import { Request, Response } from "express"
import { ExpenseService } from "../services/expenses_service/expense_service"
import { ExpenseModel } from "../domain/models/expense_model"
import { StatusReq } from "../global/status_req"

export class ExpenseController {
    expenseService: ExpenseService

    constructor(value: ExpenseService) {
        this.expenseService = value
    }

    async createExpnese(req: Request, res: Response) {
        const expenseModel: any = ExpenseModel.fromJson(req.body)
        const result = await this.expenseService.createExpense(expenseModel as ExpenseModel)
        res.json(result)
    }

    updateExpnese(req: Request, res: Response) { }

    async getExpense(req: Request, res: Response) {
        const id: number = req.body.user_id

        if (id) {
            const result = await this.expenseService.getExpense(id)
            return res.json(StatusReq.response('200', result, 'Busca realizada com sucesso'))
        }
    }

    async deleteExpense(req: Request, res: Response) {
        const hash: string = req.body.hash_expense

        if (hash) {
            const result = await this.expenseService.deleteExpense(hash)
            return res.json(StatusReq.response('200', result, 'Item deletado com sucesso'))
        }
    }

}


