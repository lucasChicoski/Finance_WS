import { expenseDTO } from "../DTO/expense_DTO"
import { v4 as uuidv4 } from 'uuid';

export class ExpenseModel {
    id?: number
    tipoDespesa: string
    descricao: string
    valorGasto: number
    data: Date
    categoria: string
    isDivided: boolean
    idUser: number
    idDespesaParcelada: number | null
    quantidade_parcela: number
    parcela: number
    idCategory: number
    month: number
    year: number
    hash: string

    constructor(value: expenseDTO, id?: number) {
        if (id) {
            this.id = id
        }
        this.tipoDespesa = value.tipoDespesa
        this.descricao = value.descricao
        this.valorGasto = value.valorGasto
        this.data = value.data
        this.categoria = value.categoria
        this.isDivided = value?.isDivided ?? false
        this.idUser = value.idUser
        this.idDespesaParcelada = value?.idDespesaParcelada ?? null
        this.idCategory = value.idCategory
        this.quantidade_parcela = value?.quantidade_parcela ?? 1 //Quantidade de prestações
        this.parcela = value.parcela // Valor da parcela
        this.month = value.month
        this.year = value.year
        this.hash = value.hash
    }

    static fromJson(json: any) {
        //Separar mes e ano
        const arrayDate = json.data.split('-')        

        return new ExpenseModel({
            categoria: json.categoria,
            data: new Date(json.data),
            tipoDespesa: json.tipoDespesa,
            descricao: json.descricao,
            valorGasto: json.valorGasto,
            isDivided: json?.isDivided ?? false,
            idUser: json.id_user,
            idDespesaParcelada: json?.id_despesas_parceladas ?? null,
            idCategory: json.id_category,
            quantidade_parcela: json?.quantidade_parcela ?? 1,
            parcela: json.parcela,
            month: parseInt(arrayDate[1]) ,
            year: parseInt(arrayDate[0]),
            hash: uuidv4()
        })

    }


    static getCurrentDate(dateV: string): Date {
        const offset = -3 * 60;
        const date = new Date(dateV);
        const currentDate = new Date(date.getTime() + (offset * 60000));

        return currentDate
    }
}