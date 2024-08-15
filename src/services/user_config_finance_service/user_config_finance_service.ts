import { FinanceConfigModel } from "../../domain/models/finance_config_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { UserConfigFinanceRepository } from "../../infra/repositories/user_config_finance/user_config_finance_repository";
import { IUserConfigFinanceService } from "./i_user_config_finance_service";



export class UserConfigFinanceService implements IUserConfigFinanceService {
    financeRepo: UserConfigFinanceRepository

    constructor() {
        this.financeRepo = RepositoryFactory.getRepository(RepositoryTtype.FinanceConfig)
    }


    async getFinanceConfig(userId: number): Promise<any> {
        const result = await this.financeRepo.getFinanceConfig(userId)
        return result
    }
    async createFinanceConfig(value: FinanceConfigModel): Promise<any> {
        const result = await this.financeRepo.createFinanceConfig(value)
        return result
    }
    async upateFinanceConfig(value: FinanceConfigModel): Promise<any> {
        const result = await this.financeRepo.upateFinanceConfig(value)
        return result
    }

}