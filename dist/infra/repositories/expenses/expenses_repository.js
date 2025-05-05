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

// src/infra/repositories/expenses/expenses_repository.ts
var expenses_repository_exports = {};
__export(expenses_repository_exports, {
  ExpensesRepository: () => ExpensesRepository
});
module.exports = __toCommonJS(expenses_repository_exports);
var ExpensesRepository = class {
  constructor(prismaInstance) {
    this.prismaDB = prismaInstance;
  }
  createExpnese(expense) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.despesas.create({
        data: {
          date: expense.data,
          descricao_despesa: expense.descricao,
          hash: expense.hash,
          is_divided: expense.isDivided,
          month: expense.month,
          parcela: expense.parcela,
          quantidade_parcela: expense.quantidade_parcela,
          tipo_despesa: expense.tipoDespesa,
          valor_gasto: expense.valorGasto,
          id_despesas_parceladas: expense.idDespesaParcelada,
          id_user: expense.idUser,
          year: expense.year,
          id_category: expense.idCategory
        }
      });
      return result;
    });
  }
  updateExpnese(expense) {
    throw new Error("Method not implemented.");
  }
  getExpense(userId) {
    return __async(this, null, function* () {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const currentMonth = (/* @__PURE__ */ new Date()).getMonth() + 1;
      const result = yield this.prismaDB.despesas.findMany({
        where: {
          id_user: userId,
          AND: {
            month: {
              lte: currentMonth
            },
            year: currentYear
          }
        },
        orderBy: {
          date: "desc"
        }
      });
      return result;
    });
  }
  deleteExpense(hash) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.despesas.delete({ where: { hash } });
      return result;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpensesRepository
});
