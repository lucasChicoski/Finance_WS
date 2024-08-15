import { Request, Response, Router } from "express";
import { UserConfigFinanceController } from "../../controllers/user_config_finance_controller";
import { UserConfigFinanceService } from "../../services/user_config_finance_service/user_config_finance_service";

const srv: UserConfigFinanceService = new UserConfigFinanceService()
const ct: UserConfigFinanceController = new UserConfigFinanceController(srv)

function routers(app: Router) {
    app.post('/get-finance-config', (req: Request, res: Response) => ct.getFinanceConfig(req, res))
    app.post('/create-finance-config', (req: Request, res: Response) => ct.createFinanceConfig(req, res))
    app.post('/update-finance-config', (req: Request, res: Response) => ct.upateFinanceConfig(req, res))
    app.post('/delete-finance', (req: Request, res: Response) => res.send('Método não implementado'))
}

export { routers as financeConfigRouters }