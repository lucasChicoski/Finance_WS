import { UserDTO } from "../DTO/user_DTO"


export class UserModel {

    id?: number
    nome: string
    sobrenome: string
    email: string
    data_nascimento: string
    telefone: string

    constructor(value: UserDTO, id?: number) {

        if (id) {
            this.id = id
        }

        this.data_nascimento = value.data_nascimento
        this.nome = value.nome
        this.sobrenome = value.sobrenome
        this.email = value.email
        this.telefone = value.telefone
    }
}