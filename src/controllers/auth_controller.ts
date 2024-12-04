import { IAuthService } from "../services/auth/i_auth_service";
import {Request, Response} from "express"




export class AuthController {

  private service: IAuthService

    constructor( authService:IAuthService) {
        this.service = authService
     }


     async handleLogin(req: Request, res: Response){
        const {cpf, passwd}: any = req.body
        const result = await this.service.login({cpf, passwd})
        return res.json(result)
     }

}