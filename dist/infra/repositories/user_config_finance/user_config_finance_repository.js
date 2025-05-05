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

// src/infra/repositories/user_config_finance/user_config_finance_repository.ts
var user_config_finance_repository_exports = {};
__export(user_config_finance_repository_exports, {
  UserConfigFinanceRepository: () => UserConfigFinanceRepository
});
module.exports = __toCommonJS(user_config_finance_repository_exports);
var UserConfigFinanceRepository = class {
  constructor(prismaInstance) {
    this.prismaDB = prismaInstance;
  }
  getFinanceConfig(userId) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.financeConfig.findUnique({ where: { user_id: userId } });
      return result;
    });
  }
  createFinanceConfig(value) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.financeConfig.create({
        data: {
          balance: value.balance,
          guarde_dinheiro: value.guardeDinheiro,
          renda: value.renda,
          user_id: value.userId
        }
      });
      return result;
    });
  }
  upateFinanceConfig(value) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.financeConfig.update({
        where: { user_id: value.userId },
        data: {
          balance: value.balance,
          guarde_dinheiro: value.guardeDinheiro,
          renda: value.renda
        }
      });
      return result;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserConfigFinanceRepository
});
