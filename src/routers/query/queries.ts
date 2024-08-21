import { Request, Response, Router } from "express";
import { QueryExpensesController } from "../../controllers/query_expense_controller";
import { QueryExpensesService } from "../../services/chart_query/expense_query/query_expense_service";

const ctl: QueryExpensesController = new QueryExpensesController(new QueryExpensesService())

function routers(app: Router) {
    app.post('/teste', (req: Request, res: Response) => ctl.getExpenseGroupByCategoryExpense(req, res))
}


export { routers as queries }