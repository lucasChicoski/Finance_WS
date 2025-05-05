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

// src/infra/repositories/auth/auth_repository.ts
var auth_repository_exports = {};
__export(auth_repository_exports, {
  AuthRepository: () => AuthRepository
});
module.exports = __toCommonJS(auth_repository_exports);
var AuthRepository = class {
  constructor(prismaInstance) {
    this.prismaDB = prismaInstance;
  }
  login(user) {
    return __async(this, null, function* () {
      try {
        const result = yield this.prismaDB.user.findUnique({
          where: {
            cpf: user.cpf,
            AND: { password: user.passwd }
          },
          select: {
            id: false,
            email: true,
            password: false,
            nome: true,
            sobrenome: true,
            cpf: true,
            Despesas: true,
            despesasParceladas: true,
            finance_config: true
          }
        });
        return result;
      } catch (error) {
        const x = error;
        throw new Error(x.message);
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthRepository
});
