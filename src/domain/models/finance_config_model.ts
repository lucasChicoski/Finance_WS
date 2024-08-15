import { financeConfigDTO } from "../DTO/finance_config_DTO"

export class FinanceConfigModel {
    id?: number
    renda: number
    guardeDinheiro: number
    balance: number
    userId: number


    constructor(value: financeConfigDTO, id?: number) {

        if (id) {
            this.id = id
        }

        this.renda = value.renda
        this.guardeDinheiro = value.guardeDinheiro
        this.balance = value.balance
        this.userId = value.userId
    }
}