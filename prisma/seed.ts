// import { PrismaClient } from '@prisma/client'
import { prismaInstance } from "./prisma_instance"




async function seedCategoryExpenses() {
    const category = ["Comida e Bebida", "Compras", "Habitação", "Transporte", "Veículo", "Vida e Entretenimento", "Comunicação / PC", "Despesas Financeiras ", "Investimentos", "Rendas", "Outros",]
    await prismaInstance.categoryExpenses.createMany({
        data: [
            {
                category: 'Comida e Bebida',
            },
            {
                category: 'Compras',
            },
            {
                category: 'Habitação',
            },
            {
                category: 'Transporte',
            },
            {
                category: 'Veículo',
            },
            {
                category: 'Vida e Entretenimento',
            },
            {
                category: 'Comunicação / PC',
            },
            {
                category: 'Despesas Financeiras',
            },
            {
                category: 'Investimentos',
            },
            {
                category: 'Rendas',
            },
            {
                category: 'Outros',
            },
        ]
    })

}

async function seedUser() {
    await prismaInstance.user.create({
        data: {
            nome: 'Lucas',
            data_nascimento: new Date('1996-11-23'),
            email: 'lucas.chicoski9@gmail.com',
            sobrenome: 'Chicoski',
            telefone: '(27) 98109-2836',
        }
    })
}

async function financeConfig() {

    await prismaInstance.financeConfig.create({
        data: {
            balance: 5000,
            guarde_dinheiro: 1000,
            renda: 5000,
            user_id: 1
        }
    })
}



async function main() {
    await seedUser()
    await financeConfig()
    await seedCategoryExpenses()
}


main()
