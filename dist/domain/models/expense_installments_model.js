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

// src/domain/models/expense_installments_model.ts
var expense_installments_model_exports = {};
__export(expense_installments_model_exports, {
  ExpenseInstallmentsModel: () => ExpenseInstallmentsModel
});
module.exports = __toCommonJS(expense_installments_model_exports);
var ExpenseInstallmentsModel = class _ExpenseInstallmentsModel {
  constructor(value, id) {
    if (id) {
      this.id = id;
    }
    this.userId = value.userId;
    this.descricaoDespesa = value.descricaoDespesa;
    this.parcela = value.parcela;
    this.quantidade_parcela = value.quantidade_parcela;
    this.valorGasto = value.valorGasto;
    this.data = value.data;
  }
  static fromJson(json) {
    const parcela = json.value_spent / json.quantidade_parcela;
    return new _ExpenseInstallmentsModel({
      userId: json.user_id,
      descricaoDespesa: json.description_spent,
      valorGasto: json.value_spent,
      quantidade_parcela: json.quantidade_parcela,
      data: new Date(json.data),
      parcela
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpenseInstallmentsModel
});
