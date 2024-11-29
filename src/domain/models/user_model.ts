import { UserDTO } from "../DTO/user_DTO"


export class UserModel {

    id?: number;
    name: string;
    lastName: string;
    birthDate?: string;
    email: string;
    phoneNumber: string;
    cpf: string;
    passwd: string;

    constructor(value: UserDTO, id?: number) {

        if (id) {
            this.id = id
        }

        this.checkAtributes(value)

        this.birthDate = value.birthDate
        this.name = value.name
        this.lastName = value.lastName
        this.email = value.email
        this.phoneNumber = value.phoneNumber
        this.cpf = value.cpf
        this.passwd = value.passwd
    }


    private checkAtributes(value: any) {
        const requiredAtributes = ["name", "lastName", "email", "cpf", "passwd"]
        const listAtributesMissing: any = []

        requiredAtributes.map((atribute) => {
            if (!value[atribute]) listAtributesMissing.push(atribute)
        })

        if (listAtributesMissing.length > 0) {
            throw {
                status: 400,
                message: `Os seguintes campos são obrigatórios: ${listAtributesMissing.join(", ")}`
            }
        }

    }
}