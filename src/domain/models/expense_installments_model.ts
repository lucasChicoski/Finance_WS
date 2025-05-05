import { ExpensesInstallmentsDTO } from "../DTO/expense_installments_DTO"

export class ExpenseInstallmentsModel {
    id?: number
    descricaoDespesa: string
    valorGasto: number
    quantidade_parcela: number
    parcela: number
    userId: number
    data: Date


    constructor(value: ExpensesInstallmentsDTO, id?: number) {
        if (id) {
            this.id = id
        }
        this.userId = value.userId
        this.descricaoDespesa = value.descricaoDespesa
        this.parcela = value.parcela
        this.quantidade_parcela = value.quantidade_parcela
        this.valorGasto = value.valorGasto
        this.data = value.data
    }

    
    static fromJson(json: any) {
        const parcela = json.value_spent / json.quantidade_parcela
        return new ExpenseInstallmentsModel({
            userId: json.user_id,
            descricaoDespesa: json.description_spent,
            valorGasto: json.value_spent,
            quantidade_parcela: json.quantidade_parcela,
            data: new Date(json.data) ,
            parcela: parcela,
        })
    }
}