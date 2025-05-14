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
        const parcela = json.valor_gasto / json.quantidade_parcela
        return new ExpenseInstallmentsModel({
            userId: json.id_user,
            descricaoDespesa: json.descricao_despesa,
            valorGasto: json.valor_gasto,
            quantidade_parcela: json.quantidade_parcela,
            data: new Date(json.date) ,
            parcela: parcela,
        })
    }
}