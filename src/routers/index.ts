import { Router } from "express";
import { financeConfigRouters } from "./user_configs_routers/finance_routers";
import { userConfigRouters } from "./user_configs_routers/user_routers";
import { expensesRouters } from "./expenses/expenses";
import { status } from "./status/status_router";
import { installmentsExpensesRouters } from "./expenses/installments_expenses";
import { categoryRouters } from "./category/category";
import { queries } from "./query/queries";
import { authRouters } from "./auth/auth";
import { routeTeste } from "./route-teste/route.teste";


function indexRouters(app: Router) {
    financeConfigRouters(app)
    userConfigRouters(app)
    expensesRouters(app)
    status(app)
    installmentsExpensesRouters(app)
    categoryRouters(app)
    queries(app)
    authRouters(app)
    routeTeste(app)
}



export default indexRouters
