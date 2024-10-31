// import { PrismaClient } from '@prisma/client'
import { prismaInstance } from "./prisma_instance"


async function seedCategoryExpenses() {
    const category = ["Comida e Bebida", "Compras", "Habitação", "Transporte", "Veículo", "Vida e Entretenimento", "Comunicação / PC", "Despesas Financeiras ", "Investimentos", "Rendas", "Outros",]
    await prismaInstance.categoryExpenses.createMany({
        data: [
            {
                category: 'Comida e Bebida',
                colors: '#ff312C51'
            },
            {
                category: 'Compras',
                colors: '#ffA2547B'
            },
            {
                category: 'Habitação',
                colors: '#ff6B43A8'
            },
            {
                category: 'Transporte',
                colors: '#ff91CA7B'
            },
            {
                category: 'Veículo',
                colors: '#ff7F3E2D'
            },
            {
                category: 'Vida e Entretenimento',
                colors: '#ffE8D260'
            },
            {
                category: 'Comunicação / PC',
                colors: '#ff4190D9'
            },
            {
                category: 'Despesas Financeiras',
                colors: '#ff5E7123'
            },
            {
                category: 'Investimentos',
                colors: '#ffF2A4C8'
            },
            {
                category: 'Rendas',
                colors: '#ff8267AF'
            },
            {
                category: 'Outros',
                colors: '#ffF4C542'
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
            password: '123456'
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
