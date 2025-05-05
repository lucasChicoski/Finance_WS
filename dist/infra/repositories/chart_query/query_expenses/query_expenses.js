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

// src/infra/repositories/chart_query/query_expenses/query_expenses.ts
var query_expenses_exports = {};
__export(query_expenses_exports, {
  QueryExpensesRepository: () => QueryExpensesRepository
});
module.exports = __toCommonJS(query_expenses_exports);
var QueryExpensesRepository = class {
  constructor(prismaInstance) {
    this.prismaDB = prismaInstance;
  }
  getExpenseGroupByCategoryExpense(value) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.$queryRaw`
        select
            d.id_category as id_category ,
            SUM(valor_gasto) as total_gasto,
            ce.category as category_label,
            ce.colors as colors
        from "Despesas" d
        inner join "CategoryExpenses"
            ce ON d.id_category = ce.id 
        where
            d."month" = ${value.month} and d.id_user = ${value.userId}
        group by
            d.id_category, ce.category, ce.colors
        `;
      return result;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryExpensesRepository
});
