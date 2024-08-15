import { UserModel } from "../../domain/models/user_model";
import { RepositoryFactory, RepositoryTtype } from "../../global/IOC";
import { UserRepository } from "../../infra/repositories/user/user_repository";
import { IUserService } from "./i_user_service";


export class UserService implements IUserService {
    userRepo: UserRepository

    constructor() {
        this.userRepo = RepositoryFactory.getRepository(RepositoryTtype.UserConfig)
    }

    createUser(user: UserModel): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async getUser(id: number): Promise<any> {
        const result = await this.userRepo.getUser(id)

        return result
    }
}