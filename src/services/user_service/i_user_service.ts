import { UserModel } from "../../domain/models/user_model"


export interface IUserService {
    createUser(user: UserModel): Promise<any>
    getUser(id: number): Promise<any>
}