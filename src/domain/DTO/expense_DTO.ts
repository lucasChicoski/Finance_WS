export interface expenseDTO {
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
}