import { Request, Response, Router } from "express";
import { AuthService } from "../../services/auth/auth_service";
import { AuthController } from "../../controllers/auth_controller";
import { IAuthService } from "../../services/auth/i_auth_service";


const srv: IAuthService = new AuthService()
const ct: AuthController = new AuthController(srv)

function routers(app: Router) {
    app.post('/auth', (req: Request, res: Response) => ct.handleLogin(req, res))
}


export { routers as authRouters }