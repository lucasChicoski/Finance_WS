import { ExpenseModel } from "../models/expense_model";
import { expenseDTO } from "./expense_DTO";


export interface UserDTO {
    id: number,
    name: string,
    lastName: string,
    birthDate: string,
    email: string,
    phoneNumber: string,
    cpf: string,
    passwd: string;
    despesas: Array<ExpenseModel>
}