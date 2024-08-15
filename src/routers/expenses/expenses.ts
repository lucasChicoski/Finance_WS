import { Request, Response, Router } from "express";
import { ExpenseController } from "../../controllers/expense_controller";
import { ExpenseService } from "../../services/expenses_service/expense_service";

const srv: ExpenseService = new ExpenseService()
const ct: ExpenseController = new ExpenseController(srv)

function routers(app: Router) {
    app.post('/register-expense', (req: Request, res: Response) => ct.createExpnese(req, res))
    app.post('/get-expense', (req: Request, res: Response) => ct.getExpense(req, res))
    app.post('/delete-expense', (req: Request, res: Response) => ct.deleteExpense(req, res))
    app.post('/update-expense', (req: Request, res: Response) => ct.updateExpnese(req, res)) //fazer por ultimo
}


export { routers as expensesRouters }