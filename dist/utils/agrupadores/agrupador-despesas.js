"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/agrupadores/agrupador-despesas.ts
var agrupador_despesas_exports = {};
__export(agrupador_despesas_exports, {
  agrupadorDespesas: () => agrupadorDespesas
});
module.exports = __toCommonJS(agrupador_despesas_exports);
function agrupadorDespesas(despesas) {
  const despesasAgrupadas = despesas.reduce((acc, despesa) => {
    let anoGroup = acc.find((group) => group.ano === despesa.year);
    if (!anoGroup) {
      anoGroup = { ano: despesa.year, meses: [] };
      acc.push(anoGroup);
    }
    let mesGroup = anoGroup.meses.find((mes) => mes.mes === despesa.month);
    if (!mesGroup) {
      mesGroup = { mes: despesa.month, itens: [] };
      anoGroup.meses.push(mesGroup);
    }
    mesGroup.itens.push(despesa);
    return acc;
  }, []);
  despesasAgrupadas.map((e) => {
    e.meses.sort((a, b) => b.mes - a.mes);
  });
  return despesasAgrupadas;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  agrupadorDespesas
});
