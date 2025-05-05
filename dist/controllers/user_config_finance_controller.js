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

// src/controllers/user_config_finance_controller.ts
var user_config_finance_controller_exports = {};
__export(user_config_finance_controller_exports, {
  UserConfigFinanceController: () => UserConfigFinanceController
});
module.exports = __toCommonJS(user_config_finance_controller_exports);
var UserConfigFinanceController = class {
  constructor(value) {
    this.configFinanceService = value;
  }
  getFinanceConfig(req, res) {
    return __async(this, null, function* () {
      const userId = req.body.userId;
      if (userId) {
        const result = yield this.configFinanceService.getFinanceConfig(userId);
        return res.json(result);
      }
      return "userId n\xE3o informado";
    });
  }
  createFinanceConfig(req, res) {
    return __async(this, null, function* () {
      const body = req.body;
      const userId = body.userId;
      const exist_config = yield this.configFinanceService.getFinanceConfig(userId);
      if (exist_config) {
        return res.json({ message: "Ja existe configura\xE7\xE3o para esse usu\xE1rio." });
      }
      const result = yield this.configFinanceService.createFinanceConfig({ balance: body.balance, guardeDinheiro: body.save_money, renda: body.renda, userId: body.userId });
      return res.json(result);
    });
  }
  upateFinanceConfig(req, res) {
    return __async(this, null, function* () {
      const body = req.body;
      const result = yield this.configFinanceService.upateFinanceConfig({ balance: body.balance, guardeDinheiro: body.save_money, renda: body.renda, userId: body.userId });
      return res.json(result);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserConfigFinanceController
});
