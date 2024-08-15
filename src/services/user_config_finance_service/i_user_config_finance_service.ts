import { FinanceConfigModel } from "../../domain/models/finance_config_model"

export interface IUserConfigFinanceService {
    getFinanceConfig(userId: number): Promise<any>
    createFinanceConfig(value: FinanceConfigModel): Promise<any>
    upateFinanceConfig(value: FinanceConfigModel): Promise<any>
}