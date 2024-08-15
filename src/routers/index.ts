import { Router } from "express";
import { financeConfigRouters } from "./user_configs_routers/finance_routers";
import { userConfigRouters } from "./user_configs_routers/user_routers";
import { expensesRouters } from "./expenses/expenses";
import { status } from "./status/status_router";
import { installmentsExpensesRouters } from "./expenses/installments_expenses";


function indexRouters(app: Router) {
    financeConfigRouters(app)
    userConfigRouters(app)
    expensesRouters(app)
    status(app)
    installmentsExpensesRouters(app)
}



export default indexRouters
