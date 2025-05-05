import { ExpenseModel } from "../../domain/models/expense_model";
import { v4 as uuidv4 } from "uuid"

type Props = {
    quantidade_parcela: number,
    valorTotal: number
    idDespesasParceladas: number
    data: string,
    userId: number
    idCategory: number
}


export function calculoParcela({data, idDespesasParceladas, quantidade_parcela, valorTotal, userId, idCategory}: Props): Array<ExpenseModel> {
    
    const listDespesas: Array<ExpenseModel> = []
    const parcela = valorTotal / quantidade_parcela
    
    const dataList = data.split('-')
    let year: number = parseInt(dataList[0])
    let month: number = parseInt(dataList[1])

    for (let i = 0; i < quantidade_parcela; i++) {

        if (month === 12) {
            year++
            month = 1
        } else {
            if(i != 0) month++
        }

        const exp = new ExpenseModel({
            categoria: 'Aletaorio',
            data: new Date(),
            tipoDespesa: 'Descricao',
            descricao: `Parcela ${i + 1} de ${quantidade_parcela}`,
            valorGasto: parcela,
            isDivided: true,
            idUser: userId,
            idDespesaParcelada: idDespesasParceladas,
            idCategory: idCategory,
            quantidade_parcela: quantidade_parcela,
            parcela: parcela,
            month: month,
            year: year,
            hash: uuidv4()
        })
        listDespesas.push(exp)
    }

    return listDespesas
}