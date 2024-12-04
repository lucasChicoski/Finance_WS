import AuthDTO from "../../../domain/DTO/auth_DTO";
export default interface IAuthRepository {
    login(user: AuthDTO): Promise<any>
}