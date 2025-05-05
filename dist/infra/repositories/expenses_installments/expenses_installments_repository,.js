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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/infra/repositories/expenses_installments/expenses_installments_repository,.ts
var expenses_installments_repository_exports = {};
__export(expenses_installments_repository_exports, {
  ExpensesInstallmentsRepository: () => ExpensesInstallmentsRepository
});
module.exports = __toCommonJS(expenses_installments_repository_exports);
var ExpensesInstallmentsRepository = class {
  constructor(prismaInstance) {
    this.prismaDB = prismaInstance;
  }
  getInstallmentsExpense(userId) {
    return __async(this, null, function* () {
      const response = yield this.prismaDB.despesasParceladas.findMany({ where: { user_id: userId } });
      return response;
    });
  }
  createInstallmentsExpense(expense) {
    return __async(this, null, function* () {
      const response = yield this.prismaDB.despesasParceladas.create({
        data: {
          descricao_despesa: expense.descricaoDespesa,
          user_id: expense.userId,
          valor_gasto: expense.valorGasto,
          prestacoes: expense.quantidade_parcela,
          parcela: expense.parcela,
          date: expense.data
        }
      });
      return response;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpensesInstallmentsRepository
});
