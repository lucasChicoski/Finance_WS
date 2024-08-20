import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { CategoryRepository } from "../../infra/repositories/category/category_repository";
import { ICategoryService } from "./i_category_service";



export class CategoryService implements ICategoryService {
    categoryRepo: CategoryRepository

    constructor() {
        this.categoryRepo = RepositoryFactory.getRepository(RepositoryTtype.Category)
    }
    async getCategories(): Promise<any> {
        const result = await this.categoryRepo.getCategories()
        return result
    }
}