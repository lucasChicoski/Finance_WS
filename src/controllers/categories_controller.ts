import { Request, Response } from "express";
// import { CategoryService } from "../services/categoires/category_service";
import { StatusReq } from "../global/status_req";
import { ICategoryService } from "../services/categoires/i_category_service";



export class CategoriesController {
    private categoryService: ICategoryService
    constructor(value: ICategoryService) {
        this.categoryService = value
    }

    async getCategories(req: Request, res: Response) {
        const result = await this.categoryService.getCategories()
        res.json(StatusReq.response('200', result, 'Busca realizada com sucesso'))
    }
}