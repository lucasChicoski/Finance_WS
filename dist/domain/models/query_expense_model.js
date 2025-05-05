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

// src/domain/models/query_expense_model.ts
var query_expense_model_exports = {};
__export(query_expense_model_exports, {
  QueryExpensesModel: () => QueryExpensesModel
});
module.exports = __toCommonJS(query_expense_model_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryExpensesModel
});
