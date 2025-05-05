export interface expenseDTO {
    tipoDespesa: string
    descricao: string
    valorGasto: number
    data: Date
    categoria: string
    isDivided: boolean
    quantidade_parcela: number | null //Quantidade de prestações
    parcela: number // Valor da parcela
    idUser: number
    idDespesaParcelada: number | null
    idCategory: number
    month: number
    year: number
    hash: string
}