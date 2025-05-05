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

// src/infra/repositories/user/user_repository.ts
var user_repository_exports = {};
__export(user_repository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(user_repository_exports);
var UserRepository = class {
  constructor(prismaInstance) {
    this.prismaDB = prismaInstance;
  }
  createUser(user) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.user.create({
        data: {
          email: user.email,
          password: user.passwd,
          nome: user.name,
          sobrenome: user.lastName,
          cpf: user.cpf
        }
      });
      return result;
    });
  }
  getUser(id) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.user.findUnique({ where: { id }, include: { finance_config: true } });
      return result;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});
