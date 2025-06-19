import { UserModel } from "../../domain/models/user_model"
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC"
import { IAuthService } from "./i_auth_service"
import IAuthRepository from "../../infra/repositories/auth/i_auth_repository"
import {AuthDTO} from "../../domain/DTO/auth_DTO"
import { StatusReq } from "../../global/status_req"

export class AuthService implements IAuthService {

    private repo: IAuthRepository

    constructor() {
        this.repo = RepositoryFactory.getRepository(RepositoryTtype.Auth)
    }
    async login(user: AuthDTO): Promise<StatusReq> {
        const result = await this.repo.login(user) as UserModel
        
        if (result) {
            return new StatusReq(200, result, 'Login realizado com sucesso')
        }

        throw new StatusReq(401, result, 'Usuário não encontrado')
    }
}