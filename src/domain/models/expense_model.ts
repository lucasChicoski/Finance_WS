import { expenseDTO } from "../DTO/expense_DTO"


export class ExpenseModel {

    id?: number
    hash: string
    month: number
    valorGasto: number
    descricaoDespesa: string
    tipoDespesa: string
    prestacoes: number
    parcela: number
    date: Date
    isDivided: boolean
    userId: number
    expenseInstallmentId?: number
    year: number
    categoryId: number

    constructor(value: expenseDTO, id?: number) {
        if (id) {
            this.id = id
        }
        this.userId = value.userId
        this.expenseInstallmentId = value.expenseInstallmentId
        this.hash = value.hash
        this.month = value.month
        this.valorGasto = value.valorGasto
        this.descricaoDespesa = value.descricaoDespesa
        this.tipoDespesa = value.tipoDespesa
        this.prestacoes = value.prestacoes
        this.parcela = value.parcela
        this.date = value.date
        this.isDivided = value.isDivided,
            this.year = value.year
        this.categoryId = value.categoryId
    }

    static fromJson(json: any) {

        return new ExpenseModel({
            expenseInstallmentId: json?.id_despesas_parceladas,
            userId: json.user_id ?? json.id_user,
            hash: json.hash,
            descricaoDespesa: json.descriptionSpent,
            month: json.month,
            parcela: json.parcela == 0 ? 1 : json.parcela,
            prestacoes: json.prestacoes,
            tipoDespesa: json.tipo_despesa,
            valorGasto: json.valueSpent,
            isDivided: json.is_divided,
            date: this.getCurrentDate(json.date),
            year: json.year,
            categoryId: json.category_id,
        })

    }


    static getCurrentDate(dateV: string): Date {
        const offset = -3 * 60;
        const date = new Date(dateV);
        const currentDate = new Date(date.getTime() + (offset * 60000));

        return currentDate
    }
}