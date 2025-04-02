

export function agrupadorDespesas(despesas: Array<any>) {
    const despesasAgrupadas = despesas.reduce((acc, despesa) => {
        // Verificar se o ano já existe
        let anoGroup = acc.find((group: any) => group.ano === despesa.year);
        if (!anoGroup) {
          anoGroup = { ano: despesa.year, meses: [] };
          acc.push(anoGroup);
        }
      
        // Verificar se o mês já existe dentro do ano
        let mesGroup = anoGroup.meses.find((mes: any) => mes.mes === despesa.month);
        if (!mesGroup) {
          mesGroup = { mes: despesa.month, itens: [] };
          anoGroup.meses.push(mesGroup);
        }
      
        // Adicionar o item ao mês correspondente
        mesGroup.itens.push(despesa);
      
        return acc;
      }, []);

  despesasAgrupadas.map((e: any) => { 

    e.meses.sort((a: any, b: any) => b.mes - a.mes)
  })

      return despesasAgrupadas
}