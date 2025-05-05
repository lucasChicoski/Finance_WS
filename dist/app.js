"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/app.ts
var import_express = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));

// src/controllers/user_config_finance_controller.ts
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

// src/services/user_config_finance_service/user_config_finance_service.ts
var UserConfigFinanceService = class {
  constructor() {
    this.financeRepo = RepositoryFactory.getRepository(0 /* FinanceConfig */);
  }
  getFinanceConfig(userId) {
    return __async(this, null, function* () {
      const result = yield this.financeRepo.getFinanceConfig(userId);
      return result;
    });
  }
  createFinanceConfig(value) {
    return __async(this, null, function* () {
      const result = yield this.financeRepo.createFinanceConfig(value);
      return result;
    });
  }
  upateFinanceConfig(value) {
    return __async(this, null, function* () {
      const result = yield this.financeRepo.upateFinanceConfig(value);
      return result;
    });
  }
};

// src/routers/user_configs_routers/finance_routers.ts
var srv = new UserConfigFinanceService();
var ct = new UserConfigFinanceController(srv);
function routers(app2) {
  app2.post("/get-finance-config", (req, res) => ct.getFinanceConfig(req, res));
  app2.post("/create-finance-config", (req, res) => ct.createFinanceConfig(req, res));
  app2.post("/update-finance-config", (req, res) => ct.upateFinanceConfig(req, res));
  app2.post("/delete-finance", (req, res) => res.send("M\xE9todo n\xE3o implementado"));
}

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
var srv2 = new UserService();
var ct2 = new UserController(srv2);
function routers2(app2) {
  app2.post("/get-user", (req, res) => ct2.getUser(req, res));
  app2.post("/create-user", (req, res) => ct2.createUser(req, res));
}

// src/domain/models/expense_model.ts
var import_uuid = require("uuid");
var ExpenseModel = class _ExpenseModel {
  constructor(value, id) {
    var _a2, _b, _c;
    if (id) {
      this.id = id;
    }
    this.tipoDespesa = value.tipoDespesa;
    this.descricao = value.descricao;
    this.valorGasto = value.valorGasto;
    this.data = value.data;
    this.categoria = value.categoria;
    this.isDivided = (_a2 = value == null ? void 0 : value.isDivided) != null ? _a2 : false;
    this.idUser = value.idUser;
    this.idDespesaParcelada = (_b = value == null ? void 0 : value.idDespesaParcelada) != null ? _b : null;
    this.idCategory = value.idCategory;
    this.quantidade_parcela = (_c = value == null ? void 0 : value.quantidade_parcela) != null ? _c : 1;
    this.parcela = value.parcela;
    this.month = value.month;
    this.year = value.year;
    this.hash = value.hash;
  }
  static fromJson(json) {
    var _a2, _b, _c;
    const arrayDate = json.data.split("-");
    return new _ExpenseModel({
      categoria: json.categoria,
      data: new Date(json.data),
      tipoDespesa: json.tipoDespesa,
      descricao: json.descricao,
      valorGasto: json.valorGasto,
      isDivided: (_a2 = json == null ? void 0 : json.isDivided) != null ? _a2 : false,
      idUser: json.id_user,
      idDespesaParcelada: (_b = json == null ? void 0 : json.id_despesas_parceladas) != null ? _b : null,
      idCategory: json.id_category,
      quantidade_parcela: (_c = json == null ? void 0 : json.quantidade_parcela) != null ? _c : 1,
      parcela: json.parcela,
      month: parseInt(arrayDate[1]),
      year: parseInt(arrayDate[0]),
      hash: (0, import_uuid.v4)()
    });
  }
  static getCurrentDate(dateV) {
    const offset = -3 * 60;
    const date = new Date(dateV);
    const currentDate = new Date(date.getTime() + offset * 6e4);
    return currentDate;
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

// src/controllers/expense_controller.ts
var ExpenseController = class {
  constructor(value) {
    this.expenseService = value;
  }
  createExpnese(req, res) {
    return __async(this, null, function* () {
      const expenseModel = ExpenseModel.fromJson(req.body);
      const result = yield this.expenseService.createExpense(expenseModel);
      res.json(result);
    });
  }
  updateExpnese(req, res) {
  }
  getExpense(req, res) {
    return __async(this, null, function* () {
      const id = req.body.user_id;
      if (id) {
        const result = yield this.expenseService.getExpense(id);
        return res.json(StatusReq.response("200", result, "Busca realizada com sucesso"));
      }
    });
  }
  deleteExpense(req, res) {
    return __async(this, null, function* () {
      const hash = req.body.hash_expense;
      if (hash) {
        const result = yield this.expenseService.deleteExpense(hash);
        return res.json(StatusReq.response("200", result, "Item deletado com sucesso"));
      }
    });
  }
};

// src/services/expenses_service/expense_service.ts
var ExpenseService = class {
  constructor() {
    this.expenseRepo = RepositoryFactory.getRepository(2 /* Expense */);
  }
  createExpense(expense) {
    return __async(this, null, function* () {
      const result = yield this.expenseRepo.createExpnese(expense);
      return result;
    });
  }
  updateExpense(expense) {
    return __async(this, null, function* () {
      const result = yield this.expenseRepo.updateExpnese(expense);
    });
  }
  getExpense(userId) {
    return __async(this, null, function* () {
      const result = yield this.expenseRepo.getExpense(userId);
      return result;
    });
  }
  deleteExpense(hash) {
    return __async(this, null, function* () {
      const result = yield this.expenseRepo.deleteExpense(hash);
      return result;
    });
  }
};

// src/routers/expenses/expenses.ts
var srv3 = new ExpenseService();
var ct3 = new ExpenseController(srv3);
function routers3(app2) {
  app2.post("/register-expense", (req, res) => ct3.createExpnese(req, res));
  app2.post("/get-expense", (req, res) => ct3.getExpense(req, res));
  app2.post("/delete-expense", (req, res) => ct3.deleteExpense(req, res));
  app2.post("/update-expense", (req, res) => ct3.updateExpnese(req, res));
}

// src/routers/status/status_router.ts
function routers4(app2) {
  app2.get("/status", (req, res) => res.render("api-status"));
}

// src/utils/scripts/calculo-parcela.ts
var import_uuid2 = require("uuid");
function calculoParcela({ data, idDespesasParceladas, quantidade_parcela, valorTotal, userId, idCategory }) {
  const listDespesas = [];
  const parcela = valorTotal / quantidade_parcela;
  const dataList = data.split("-");
  let year = parseInt(dataList[0]);
  let month = parseInt(dataList[1]);
  for (let i = 0; i < quantidade_parcela; i++) {
    if (month === 12) {
      year++;
      month = 1;
    } else {
      if (i != 0) month++;
    }
    const exp = new ExpenseModel({
      categoria: "Aletaorio",
      data: /* @__PURE__ */ new Date(),
      tipoDespesa: "Descricao",
      descricao: `Parcela ${i + 1} de ${quantidade_parcela}`,
      valorGasto: parcela,
      isDivided: true,
      idUser: userId,
      idDespesaParcelada: idDespesasParceladas,
      idCategory,
      quantidade_parcela,
      parcela,
      month,
      year,
      hash: (0, import_uuid2.v4)()
    });
    listDespesas.push(exp);
  }
  return listDespesas;
}

// src/services/expenses_installments_service/expenses_installments_service.ts
var ExpensesInstallmentsService = class {
  constructor() {
    this.expenseInstallmentsRepo = RepositoryFactory.getRepository(3 /* ExpenseInstallments */);
    this.expenseRepo = RepositoryFactory.getRepository(2 /* Expense */);
  }
  createInstallmentsExpense(expense) {
    return __async(this, null, function* () {
      const response = yield this.expenseInstallmentsRepo.createInstallmentsExpense(expense);
      const listDespesasParceladas = calculoParcela({
        data: expense.data.toISOString(),
        idCategory: 1,
        idDespesasParceladas: response.id,
        quantidade_parcela: expense.quantidade_parcela,
        userId: expense.userId,
        valorTotal: expense.valorGasto
      });
      for (const despesa of listDespesasParceladas) {
        yield this.expenseRepo.createExpnese(despesa);
      }
      return response;
    });
  }
  getInstallmentsExpense(userId) {
    return __async(this, null, function* () {
      const response = yield this.expenseInstallmentsRepo.getInstallmentsExpense(userId);
      return response;
    });
  }
};

// src/domain/models/expense_installments_model.ts
var ExpenseInstallmentsModel = class _ExpenseInstallmentsModel {
  constructor(value, id) {
    if (id) {
      this.id = id;
    }
    this.userId = value.userId;
    this.descricaoDespesa = value.descricaoDespesa;
    this.parcela = value.parcela;
    this.quantidade_parcela = value.quantidade_parcela;
    this.valorGasto = value.valorGasto;
    this.data = value.data;
  }
  static fromJson(json) {
    const parcela = json.value_spent / json.quantidade_parcela;
    return new _ExpenseInstallmentsModel({
      userId: json.user_id,
      descricaoDespesa: json.description_spent,
      valorGasto: json.value_spent,
      quantidade_parcela: json.quantidade_parcela,
      data: new Date(json.data),
      parcela
    });
  }
};

// src/controllers/expense_installments_controller.ts
var ExpenseInstallmentsController = class {
  constructor(value) {
    this.expenseInstallmentsService = value;
  }
  createInstallmentsExpense(req, res) {
    return __async(this, null, function* () {
      const expenseInstallments = ExpenseInstallmentsModel.fromJson(req.body);
      const response = yield this.expenseInstallmentsService.createInstallmentsExpense(expenseInstallments);
      return res.json(StatusReq.response("200", response, "Despesa criada com sucesso"));
    });
  }
  getInstallmentsExpense(req, res) {
    return __async(this, null, function* () {
      const userId = req.body.user_id;
      if (userId) {
        const response = yield this.expenseInstallmentsService.getInstallmentsExpense(userId);
        return res.json(StatusReq.response("200", response, "Busca realizada com sucesso"));
      }
      return res.json(StatusReq.response("400", null, "user_id na\u0303o informado"));
    });
  }
};

// src/routers/expenses/installments_expenses.ts
var ct4 = new ExpenseInstallmentsController(new ExpensesInstallmentsService());
function routers5(app2) {
  app2.post("/register-installments-expense", (req, res) => ct4.createInstallmentsExpense(req, res));
  app2.post("/get-installments-expense", (req, res) => ct4.getInstallmentsExpense(req, res));
}

// src/controllers/categories_controller.ts
var CategoriesController = class {
  constructor(value) {
    this.categoryService = value;
  }
  getCategories(req, res) {
    return __async(this, null, function* () {
      const result = yield this.categoryService.getCategories();
      res.json(StatusReq.response("200", result, "Busca realizada com sucesso"));
    });
  }
};

// src/services/categoires/category_service.ts
var CategoryService = class {
  constructor() {
    this.categoryRepo = RepositoryFactory.getRepository(4 /* Category */);
  }
  getCategories() {
    return __async(this, null, function* () {
      const result = yield this.categoryRepo.getCategories();
      return result;
    });
  }
};

// src/routers/category/category.ts
var ctl = new CategoriesController(new CategoryService());
function routers6(app2) {
  app2.post("/get-categories", (req, res) => ctl.getCategories(req, res));
}

// src/domain/models/query_expense_model.ts
var QueryExpensesModel = class _QueryExpensesModel {
  constructor(value) {
    var _a2;
    this.month = (_a2 = value == null ? void 0 : value.month) != null ? _a2 : (/* @__PURE__ */ new Date()).getMonth() + 1;
    this.userId = value.userId;
  }
  static fromJson(json) {
    return new _QueryExpensesModel({
      month: json == null ? void 0 : json.month,
      userId: json.user_id
    });
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
var ctl2 = new QueryExpensesController(new QueryExpensesService());
function routers7(app2) {
  app2.post("/group-by-category-expense", (req, res) => ctl2.getExpenseGroupByCategoryExpense(req, res));
}

// src/utils/agrupadores/agrupador-despesas.ts
function agrupadorDespesas(despesas) {
  const despesasAgrupadas = despesas.reduce((acc, despesa) => {
    let anoGroup = acc.find((group) => group.ano === despesa.year);
    if (!anoGroup) {
      anoGroup = { ano: despesa.year, meses: [] };
      acc.push(anoGroup);
    }
    let mesGroup = anoGroup.meses.find((mes) => mes.mes === despesa.month);
    if (!mesGroup) {
      mesGroup = { mes: despesa.month, itens: [] };
      anoGroup.meses.push(mesGroup);
    }
    mesGroup.itens.push(despesa);
    return acc;
  }, []);
  despesasAgrupadas.map((e) => {
    e.meses.sort((a, b) => b.mes - a.mes);
  });
  return despesasAgrupadas;
}

// src/services/auth/auth_service.ts
var AuthService = class {
  constructor() {
    this.repo = RepositoryFactory.getRepository(6 /* Auth */);
  }
  login(user) {
    return __async(this, null, function* () {
      const result = yield this.repo.login(user);
      if (result) {
        const resultado = Object.values(agrupadorDespesas(result.Despesas));
        result.despesasAgrupadas = resultado;
        return new StatusReq(200, result, "Login realizado com sucesso");
      }
      throw new StatusReq(401, result, "Usua\u0301rio na\u0303o encontrado");
    });
  }
};

// src/controllers/auth_controller.ts
var AuthController = class {
  constructor(authService) {
    this.service = authService;
  }
  handleLogin(req, res) {
    return __async(this, null, function* () {
      const { cpf, passwd } = req.body;
      try {
        const result = yield this.service.login({ cpf, passwd });
        return res.json(result);
      } catch (error) {
        return res.json(error);
      }
    });
  }
};

// src/routers/auth/auth.ts
var srv4 = new AuthService();
var ct5 = new AuthController(srv4);
function routers8(app2) {
  app2.post("/auth", (req, res) => ct5.handleLogin(req, res));
}

// src/routers/index.ts
function indexRouters(app2) {
  routers(app2);
  routers2(app2);
  routers3(app2);
  routers4(app2);
  routers5(app2);
  routers6(app2);
  routers7(app2);
  routers8(app2);
}
var routers_default = indexRouters;

// src/app.ts
var import_cors = __toESM(require("cors"));
var import_path = __toESM(require("path"));
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.use((0, import_cors.default)({ origin: "*" }));
app.set("views", import_path.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
routers_default(app);
var _a;
var port = (_a = process.env.PORT) != null ? _a : 3001;
app.listen(port, () => {
  console.log("Aplica\xE7\xE3o rodando na porta:", port);
});
