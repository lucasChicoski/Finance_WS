import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user_controller";
import { UserService } from "../../services/user_service/user_service";

const srv: UserService = new UserService()
const ct: UserController = new UserController(srv)

function routers(app: Router) {
    app.post('/get-user', (req: Request, res: Response) => ct.getUser(req, res))
    app.post('/create-user')
}


export { routers as userConfigRouters }