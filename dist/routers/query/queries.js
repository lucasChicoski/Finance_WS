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

// src/routers/query/queries.ts
var queries_exports = {};
__export(queries_exports, {
  queries: () => routers
});
module.exports = __toCommonJS(queries_exports);

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

// src/services/chart_query/expense_query/query_expense_service.ts
var QueryExpensesService = class {
  constructor() {
    this.queryExpenseRepo = RepositoryFactory.getRepository(5 /* QueryExpense */);
  }
  getExpenseGroupByCategoryExpense(value) {
    return __async(this, null, function* () {
      const response = yield this.queryExpenseRepo.getExpenseGroupByCategoryExpense(value);
      return response;
    });
  }
};

// src/routers/query/queries.ts
var ctl = new QueryExpensesController(new QueryExpensesService());
function routers(app) {
  app.post("/group-by-category-expense", (req, res) => ctl.getExpenseGroupByCategoryExpense(req, res));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  queries
});
