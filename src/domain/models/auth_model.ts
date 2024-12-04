import AuthDTO from "../DTO/auth_DTO"

export class AuthModel {
    cpf: string
    passwd: string
    constructor(value: AuthDTO) {
        this.cpf = value.cpf
        this.passwd = value.passwd
    }
}