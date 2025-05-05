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

// src/controllers/user_controller.ts
var user_controller_exports = {};
__export(user_controller_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(user_controller_exports);

// src/domain/models/user_model.ts
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

// src/controllers/user_controller.ts
var UserController = class {
  constructor(value) {
    this.userService = value;
  }
  createUser(req, res) {
    return __async(this, null, function* () {
      const body = req.body;
      try {
        const result = yield this.userService.createUser(new UserModel(body));
        res.json({
          data: result,
          message: "Usuario criado com sucesso",
          statusText: "success",
          statusCode: 200
        });
      } catch (error) {
        const err = error;
        res.json({
          data: null,
          message: err.message,
          statusText: "err",
          statusCode: 400
        });
      }
    });
  }
  getUser(req, res) {
    return __async(this, null, function* () {
      const userId = req.body.userId;
      if (userId) {
        const result = yield this.userService.getUser(userId);
        return res.json(result);
      }
      return res.json({ message: "Id N\xE3o informado" });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
