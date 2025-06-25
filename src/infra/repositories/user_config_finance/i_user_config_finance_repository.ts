import { FinanceConfigModel } from "../../../domain/models/finance_config_model"

export interface IUserConfigFinanceRepository {
    getFinanceConfig(userId: number): Promise<any>
    createFinanceConfig(value: FinanceConfigModel): Promise<any>
    updateFinanceConfig(value: FinanceConfigModel): Promise<any>
}