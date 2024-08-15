import { UserModel } from "../../../domain/models/user_model"

export interface IUserRepository {
    createUser(user: UserModel): Promise<any>
    getUser(id: number): Promise<any>
}