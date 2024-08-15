import { ExpensesInstallmentsDTO } from "../DTO/expense_installments_DTO"


export class ExpenseInstallmentsModel {
    id?: number
    descricaoDespesa: string
    valorGasto: number
    prestacoes: number
    parcela: number
    userId: number

    constructor(value: ExpensesInstallmentsDTO, id?: number) {
        if (id) {
            this.id = id
        }
        this.userId = value.userId
        this.descricaoDespesa = value.descricaoDespesa
        this.parcela = value.parcela
        this.prestacoes = value.prestacoes
        this.valorGasto = value.valorGasto
    }


    static fromJson(json: any) {
        return new ExpenseInstallmentsModel({
            descricaoDespesa: json.description_spent,
            valorGasto: json.value_spent,
            prestacoes: json.prestacoes,
            parcela: json.parcela,
            userId: json.user_id
        })
    }

}