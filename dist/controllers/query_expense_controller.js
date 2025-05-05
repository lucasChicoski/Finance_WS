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

// src/controllers/query_expense_controller.ts
var query_expense_controller_exports = {};
__export(query_expense_controller_exports, {
  QueryExpensesController: () => QueryExpensesController
});
module.exports = __toCommonJS(query_expense_controller_exports);

// src/domain/models/query_expense_model.ts
var QueryExpensesModel = class _QueryExpensesModel {
  constructor(value) {
    var _a;
    this.month = (_a = value == null ? void 0 : value.month) != null ? _a : (/* @__PURE__ */ new Date()).getMonth() + 1;
    this.userId = value.userId;
  }
  static fromJson(json) {
    return new _QueryExpensesModel({
      month: json == null ? void 0 : json.month,
      userId: json.user_id
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

// src/controllers/query_expense_controller.ts
var QueryExpensesController = class {
  constructor(value) {
    this.queryExpensesService = value;
  }
  getExpenseGroupByCategoryExpense(req, res) {
    return __async(this, null, function* () {
      const body = req.body;
      const filter = QueryExpensesModel.fromJson(body);
      const response = yield this.queryExpensesService.getExpenseGroupByCategoryExpense(filter);
      return res.json(StatusReq.response("200", response, "Busca realizada com sucesso"));
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryExpensesController
});
