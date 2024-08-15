import { Request, Response, Router } from "express"
import { ExpensesInstallmentsService } from "../../services/expenses_installments_service/expenses_installments_service"
import { ExpenseInstallmentsController } from "../../controllers/expense_installments_controller"

const ct: ExpenseInstallmentsController = new ExpenseInstallmentsController(new ExpensesInstallmentsService())

function routers(app: Router) {
    app.post('/register-installments-expense', (req: Request, res: Response) => ct.createInstallmentsExpense(req, res))
    app.post('/get-installments-expense', (req: Request, res: Response) => ct.getInstallmentsExpense(req, res))
}

export { routers as installmentsExpensesRouters }