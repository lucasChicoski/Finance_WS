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

// src/domain/models/user_model.ts
var user_model_exports = {};
__export(user_model_exports, {
  UserModel: () => UserModel
});
module.exports = __toCommonJS(user_model_exports);
var UserModel = class {
  constructor(value, id) {
    if (id) {
      this.id = id;
    }
    this.checkAtributes(value);
    this.Despesas = value.despesas;
    this.birthDate = value.birthDate;
    this.name = value.name;
    this.lastName = value.lastName;
    this.email = value.email;
    this.phoneNumber = value.phoneNumber;
    this.cpf = value.cpf;
    this.passwd = value.passwd;
  }
  checkAtributes(value) {
    const requiredAtributes = ["name", "lastName", "email", "cpf", "passwd"];
    const listAtributesMissing = [];
    requiredAtributes.map((atribute) => {
      if (!value[atribute]) listAtributesMissing.push(atribute);
    });
    if (listAtributesMissing.length > 0) {
      throw {
        status: 400,
        message: `Os seguintes campos sa\u0303o obrigato\u0301rios: ${listAtributesMissing.join(", ")}`
      };
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserModel
});
