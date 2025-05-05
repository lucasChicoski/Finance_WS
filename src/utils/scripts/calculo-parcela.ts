import { ExpenseModel } from "../../domain/models/expense_model";
import { v4 as uuidv4 } from "uuid"

type Props = {
    prestacoes: number,
    valorTotal: number
    idDespesasParceladas: number
    data: string,
    userId: number
    idCategory: number
}


export function calculoParcela({data, idDespesasParceladas, prestacoes, valorTotal, userId, idCategory}: Props): Array<ExpenseModel> {
    
    const listDespesas: Array<ExpenseModel> = []
    const parcela = valorTotal / prestacoes
    
    const dataList = data.split('-')
    let year: number = parseInt(dataList[0])
    let month: number = parseInt(dataList[1])

    for (let i = 0; i < prestacoes; i++) {

        if (month === 12) {
            year++
            month = 1
        } else {
            month++
        }

        const exp = new ExpenseModel({
            categoria: 'Aletaorio',
            data: new Date(),
            tipoDespesa: 'Descricao',
            descricao: `Parcela ${i + 1} de ${prestacoes}`,
            valorGasto: parcela,
            isDivided: true,
            idUser: userId,
            idDespesaParcelada: idDespesasParceladas,
            idCategory: idCategory,
            prestacoes: prestacoes,
            parcela: parcela,
            month: month,
            year: year,
            hash: uuidv4()
        })
        listDespesas.push(exp)
    }

    return listDespesas
}