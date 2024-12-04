import { prismaInstance } from "../../prisma/prisma_instance";
import { AuthRepository } from "../infra/repositories/auth/auth_repository";
import { CategoryRepository } from "../infra/repositories/category/category_repository";
import { QueryExpensesRepository } from "../infra/repositories/chart_query/query_expenses/query_expenses";
import { ExpensesRepository } from "../infra/repositories/expenses/expenses_repository";
import { ExpensesInstallmentsRepository } from "../infra/repositories/expenses_installments/expenses_installments_repository,";
import { UserRepository } from "../infra/repositories/user/user_repository";
import { UserConfigFinanceRepository } from "../infra/repositories/user_config_finance/user_config_finance_repository";


export enum RepositoryTtype {
    FinanceConfig,
    UserConfig,
    Expense,
    ExpenseInstallments,
    Category,
    QueryExpense,
    Auth
}

export class RepositoryFactory {

    static getRepository(value: RepositoryTtype): any {
        switch (value) {
            case RepositoryTtype.FinanceConfig:
                return new UserConfigFinanceRepository(prismaInstance)

            case RepositoryTtype.UserConfig:
                return new UserRepository(prismaInstance)

            case RepositoryTtype.Expense:
                return new ExpensesRepository(prismaInstance)

            case RepositoryTtype.ExpenseInstallments:
                return new ExpensesInstallmentsRepository(prismaInstance)

            case RepositoryTtype.Category:
                return new CategoryRepository(prismaInstance)

            case RepositoryTtype.QueryExpense:
                return new QueryExpensesRepository(prismaInstance)

            case RepositoryTtype.Auth:
                return new AuthRepository(prismaInstance)

            default:
                throw ('Repositorio não encontrado')
        }
    }
}
