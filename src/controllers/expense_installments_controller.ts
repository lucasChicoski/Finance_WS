import { Request, Response } from "express"
import { ExpenseInstallmentsModel } from "../domain/models/expense_installments_model"
import { ExpensesInstallmentsService } from "../services/expenses_installments_service/expenses_installments_service"
import { StatusReq } from "../global/status_req"



export class ExpenseInstallmentsController {
    expenseInstallmentsService: ExpensesInstallmentsService

    constructor(value: ExpensesInstallmentsService) {
        this.expenseInstallmentsService = value
    }

    async createInstallmentsExpense(req: Request, res: Response) {
        const expenseInstallments = ExpenseInstallmentsModel.fromJson(req.body)
        const response = await this.expenseInstallmentsService.createInstallmentsExpense(expenseInstallments)
        return res.json(StatusReq.response('200', response, 'Despesa criada com sucesso'))

    }
    async getInstallmentsExpense(req: Request, res: Response) {

        const userId = req.body.user_id

        if (userId) {
            const response = await this.expenseInstallmentsService.getInstallmentsExpense(userId)
            return res.json(StatusReq.response('200', response, 'Busca realizada com sucesso'))
        }

        return res.json(StatusReq.response('400', null, 'user_id não informado'))
    }

}