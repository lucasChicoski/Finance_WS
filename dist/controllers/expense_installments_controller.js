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

// src/controllers/expense_installments_controller.ts
var expense_installments_controller_exports = {};
__export(expense_installments_controller_exports, {
  ExpenseInstallmentsController: () => ExpenseInstallmentsController
});
module.exports = __toCommonJS(expense_installments_controller_exports);

// src/domain/models/expense_installments_model.ts
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

// src/global/status_req.ts
var StatusReq = class {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.statusText = "success";
  }
  static response(status, data, message) {
    return {
      "status": status,
      "data": data,
      "message": message,
      "statusText": "success"
    };
  }
};

// src/controllers/expense_installments_controller.ts
var ExpenseInstallmentsController = class {
  constructor(value) {
    this.expenseInstallmentsService = value;
  }
  createInstallmentsExpense(req, res) {
    return __async(this, null, function* () {
      const expenseInstallments = ExpenseInstallmentsModel.fromJson(req.body);
      const response = yield this.expenseInstallmentsService.createInstallmentsExpense(expenseInstallments);
      return res.json(StatusReq.response("200", response, "Despesa criada com sucesso"));
    });
  }
  getInstallmentsExpense(req, res) {
    return __async(this, null, function* () {
      const userId = req.body.user_id;
      if (userId) {
        const response = yield this.expenseInstallmentsService.getInstallmentsExpense(userId);
        return res.json(StatusReq.response("200", response, "Busca realizada com sucesso"));
      }
      return res.json(StatusReq.response("400", null, "user_id na\u0303o informado"));
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ExpenseInstallmentsController
});
