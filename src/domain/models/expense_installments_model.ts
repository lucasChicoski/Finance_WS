import { calculoParcela } from "../../utils/scripts/calculo-parcela"
import { ExpensesInstallmentsDTO } from "../DTO/expense_installments_DTO"
import { ExpenseModel } from "./expense_model"


export class ExpenseInstallmentsModel {
    id?: number
    descricaoDespesa: string
    valorGasto: number
    prestacoes: number
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
        this.prestacoes = value.prestacoes
        this.valorGasto = value.valorGasto
        this.data = value.data
    }

    
    static fromJson(json: any) {
        const parcela = json.value_spent / json.prestacoes
        return new ExpenseInstallmentsModel({
            userId: json.user_id,
            descricaoDespesa: json.description_spent,
            valorGasto: json.value_spent,
            prestacoes: json.prestacoes,
            data: new Date(json.data) ,
            parcela: parcela,
        })
    }
}