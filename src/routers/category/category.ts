import { Request, Response, Router } from "express";
import { CategoriesController } from "../../controllers/categories_controller";
import { CategoryService } from "../../services/categoires/category_service";


const ctl: CategoriesController = new CategoriesController(new CategoryService())

function routers(app: Router) {
    app.post('/get-categories', (req: Request, res: Response) => ctl.getCategories(req, res))
}

export { routers as categoryRouters }