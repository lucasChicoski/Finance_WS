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

// src/utils/scripts/calculo-parcela.ts
var calculo_parcela_exports = {};
__export(calculo_parcela_exports, {
  calculoParcela: () => calculoParcela
});
module.exports = __toCommonJS(calculo_parcela_exports);

// src/domain/models/expense_model.ts
var import_uuid = require("uuid");
var ExpenseModel = class _ExpenseModel {
  constructor(value, id) {
    var _a, _b, _c;
    if (id) {
      this.id = id;
    }
    this.tipoDespesa = value.tipoDespesa;
    this.descricao = value.descricao;
    this.valorGasto = value.valorGasto;
    this.data = value.data;
    this.categoria = value.categoria;
    this.isDivided = (_a = value == null ? void 0 : value.isDivided) != null ? _a : false;
    this.idUser = value.idUser;
    this.idDespesaParcelada = (_b = value == null ? void 0 : value.idDespesaParcelada) != null ? _b : null;
    this.idCategory = value.idCategory;
    this.quantidade_parcela = (_c = value == null ? void 0 : value.quantidade_parcela) != null ? _c : 1;
    this.parcela = value.parcela;
    this.month = value.month;
    this.year = value.year;
    this.hash = value.hash;
  }
  static fromJson(json) {
    var _a, _b, _c;
    const arrayDate = json.data.split("-");
    return new _ExpenseModel({
      categoria: json.categoria,
      data: new Date(json.data),
      tipoDespesa: json.tipoDespesa,
      descricao: json.descricao,
      valorGasto: json.valorGasto,
      isDivided: (_a = json == null ? void 0 : json.isDivided) != null ? _a : false,
      idUser: json.id_user,
      idDespesaParcelada: (_b = json == null ? void 0 : json.id_despesas_parceladas) != null ? _b : null,
      idCategory: json.id_category,
      quantidade_parcela: (_c = json == null ? void 0 : json.quantidade_parcela) != null ? _c : 1,
      parcela: json.parcela,
      month: parseInt(arrayDate[1]),
      year: parseInt(arrayDate[0]),
      hash: (0, import_uuid.v4)()
    });
  }
  static getCurrentDate(dateV) {
    const offset = -3 * 60;
    const date = new Date(dateV);
    const currentDate = new Date(date.getTime() + offset * 6e4);
    return currentDate;
  }
};

// src/utils/scripts/calculo-parcela.ts
var import_uuid2 = require("uuid");
function calculoParcela({ data, idDespesasParceladas, quantidade_parcela, valorTotal, userId, idCategory }) {
  const listDespesas = [];
  const parcela = valorTotal / quantidade_parcela;
  const dataList = data.split("-");
  let year = parseInt(dataList[0]);
  let month = parseInt(dataList[1]);
  for (let i = 0; i < quantidade_parcela; i++) {
    if (month === 12) {
      year++;
      month = 1;
    } else {
      if (i != 0) month++;
    }
    const exp = new ExpenseModel({
      categoria: "Aletaorio",
      data: /* @__PURE__ */ new Date(),
      tipoDespesa: "Descricao",
      descricao: `Parcela ${i + 1} de ${quantidade_parcela}`,
      valorGasto: parcela,
      isDivided: true,
      idUser: userId,
      idDespesaParcelada: idDespesasParceladas,
      idCategory,
      quantidade_parcela,
      parcela,
      month,
      year,
      hash: (0, import_uuid2.v4)()
    });
    listDespesas.push(exp);
  }
  return listDespesas;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculoParcela
});
