import AuthDTO from "../../domain/DTO/auth_DTO";
import { UserModel } from "../../domain/models/user_model";
import { StatusReq } from "../../global/status_req";



export interface IAuthService {
    login(user: AuthDTO): Promise<StatusReq>
}