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

// src/routers/user_configs_routers/user_routers.ts
var user_routers_exports = {};
__export(user_routers_exports, {
  userConfigRouters: () => routers
});
module.exports = __toCommonJS(user_routers_exports);

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

// prisma/prisma_instance.ts
var import_client = require("@prisma/client");
var prismaInstance = global.prisma || new import_client.PrismaClient({
  // log: ['query'],
});

// src/infra/repositories/auth/auth_repository.ts
var AuthRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
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

// src/infra/repositories/category/category_repository.ts
var CategoryRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
  }
  getCategories() {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.categoryExpenses.findMany();
      return result;
    });
  }
};

// src/infra/repositories/chart_query/query_expenses/query_expenses.ts
var QueryExpensesRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
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

// src/infra/repositories/expenses/expenses_repository.ts
var ExpensesRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
  }
  createExpnese(expense) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.despesas.create({
        data: {
          date: expense.data,
          descricao_despesa: expense.descricao,
          hash: expense.hash,
          is_divided: expense.isDivided,
          month: expense.month,
          parcela: expense.parcela,
          quantidade_parcela: expense.quantidade_parcela,
          tipo_despesa: expense.tipoDespesa,
          valor_gasto: expense.valorGasto,
          id_despesas_parceladas: expense.idDespesaParcelada,
          id_user: expense.idUser,
          year: expense.year,
          id_category: expense.idCategory
        }
      });
      return result;
    });
  }
  updateExpnese(expense) {
    throw new Error("Method not implemented.");
  }
  getExpense(userId) {
    return __async(this, null, function* () {
      const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      const currentMonth = (/* @__PURE__ */ new Date()).getMonth() + 1;
      const result = yield this.prismaDB.despesas.findMany({
        where: {
          id_user: userId,
          AND: {
            month: {
              lte: currentMonth
            },
            year: currentYear
          }
        },
        orderBy: {
          date: "desc"
        }
      });
      return result;
    });
  }
  deleteExpense(hash) {
    return __async(this, null, function* () {
      const result = yield this.prismaDB.despesas.delete({ where: { hash } });
      return result;
    });
  }
};

// src/infra/repositories/expenses_installments/expenses_installments_repository,.ts
var ExpensesInstallmentsRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
  }
  getInstallmentsExpense(userId) {
    return __async(this, null, function* () {
      const response = yield this.prismaDB.despesasParceladas.findMany({ where: { user_id: userId } });
      return response;
    });
  }
  createInstallmentsExpense(expense) {
    return __async(this, null, function* () {
      const response = yield this.prismaDB.despesasParceladas.create({
        data: {
          descricao_despesa: expense.descricaoDespesa,
          user_id: expense.userId,
          valor_gasto: expense.valorGasto,
          prestacoes: expense.quantidade_parcela,
          parcela: expense.parcela,
          date: expense.data
        }
      });
      return response;
    });
  }
};

// src/infra/repositories/user/user_repository.ts
var UserRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
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

// src/infra/repositories/user_config_finance/user_config_finance_repository.ts
var UserConfigFinanceRepository = class {
  constructor(prismaInstance2) {
    this.prismaDB = prismaInstance2;
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

// src/global/IOC.ts
var RepositoryFactory = class {
  static getRepository(value) {
    switch (value) {
      case 0 /* FinanceConfig */:
        return new UserConfigFinanceRepository(prismaInstance);
      case 1 /* UserConfig */:
        return new UserRepository(prismaInstance);
      case 2 /* Expense */:
        return new ExpensesRepository(prismaInstance);
      case 3 /* ExpenseInstallments */:
        return new ExpensesInstallmentsRepository(prismaInstance);
      case 4 /* Category */:
        return new CategoryRepository(prismaInstance);
      case 5 /* QueryExpense */:
        return new QueryExpensesRepository(prismaInstance);
      case 6 /* Auth */:
        return new AuthRepository(prismaInstance);
      default:
        throw "Repositorio n\xE3o encontrado";
    }
  }
};

// src/services/user_service/user_service.ts
var UserService = class {
  constructor() {
    this.userRepo = RepositoryFactory.getRepository(1 /* UserConfig */);
  }
  createUser(user) {
    return __async(this, null, function* () {
      const result = yield this.userRepo.createUser(user);
      return result;
    });
  }
  getUser(id) {
    return __async(this, null, function* () {
      const result = yield this.userRepo.getUser(id);
      return result;
    });
  }
};

// src/routers/user_configs_routers/user_routers.ts
var srv = new UserService();
var ct = new UserController(srv);
function routers(app) {
  app.post("/get-user", (req, res) => ct.getUser(req, res));
  app.post("/create-user", (req, res) => ct.createUser(req, res));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userConfigRouters
});
