import { Request, Response, Router } from "express";
import { UserConfigFinanceRepository } from "../../infra/repositories/user_config_finance/user_config_finance_repository";
import { prismaInstance } from "../../../prisma/prisma_instance";

const _userConfigTeste = new UserConfigFinanceRepository(prismaInstance)

function routeTeste(app: Router) {
    // app.get('/route-teste', (req: Request, res: Response) => _userConfigTeste.calculateBalance(1))
}


export { routeTeste }