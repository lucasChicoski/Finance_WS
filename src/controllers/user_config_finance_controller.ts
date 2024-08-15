import { Request, Response } from "express";
import { UserConfigFinanceService } from "../services/user_config_finance_service/user_config_finance_service";




export class UserConfigFinanceController {
    configFinanceService: UserConfigFinanceService

    constructor(value: UserConfigFinanceService) {
        this.configFinanceService = value
    }

    async getFinanceConfig(req: Request, res: Response) {

        /**
         * Rota necessida de:
         * @userId <- parametro de busca
         */

        const userId = req.body.userId

        if (userId) {
            const result = await this.configFinanceService.getFinanceConfig(userId)
            return res.json(result)
        }

        return 'userId não informado'
    }
    async createFinanceConfig(req: Request, res: Response) {
        const body = req.body

        const userId: number = body.userId

        const exist_config = await this.configFinanceService.getFinanceConfig(userId)

        if (exist_config) {
            return res.json({ message: 'Ja existe configuração para esse usuário.' })
        }

        const result = await this.configFinanceService.createFinanceConfig({ balance: body.balance, guardeDinheiro: body.save_money, renda: body.renda, userId: body.userId })
        return res.json(result)

    }
    async upateFinanceConfig(req: Request, res: Response) {
        const body = req.body
        const result = await this.configFinanceService.upateFinanceConfig({ balance: body.balance, guardeDinheiro: body.save_money, renda: body.renda, userId: body.userId })
        return res.json(result)
    }
}