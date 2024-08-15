-- CreateTable
CREATE TABLE "Despesas" (
    "id" SERIAL NOT NULL,
    "tipo_despesa" TEXT NOT NULL,
    "descricao_despesa" TEXT NOT NULL,
    "valor_gasto" DOUBLE PRECISION NOT NULL,
    "prestacoes" DOUBLE PRECISION NOT NULL,
    "parcela" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "is_divided" BOOLEAN NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_despesas_parceladas" INTEGER NOT NULL,

    CONSTRAINT "Despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DespesasParceladas" (
    "id" SERIAL NOT NULL,
    "descricao_despesa" TEXT NOT NULL,
    "valor_gasto" DOUBLE PRECISION NOT NULL,
    "prestacoes" DOUBLE PRECISION NOT NULL,
    "parcela" INTEGER NOT NULL,

    CONSTRAINT "DespesasParceladas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceConfig" (
    "id" SERIAL NOT NULL,
    "renda" DOUBLE PRECISION NOT NULL,
    "guarde_dinheiro" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "FinanceConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinanceConfig_user_id_key" ON "FinanceConfig"("user_id");

-- AddForeignKey
ALTER TABLE "Despesas" ADD CONSTRAINT "Despesas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesas" ADD CONSTRAINT "Despesas_id_despesas_parceladas_fkey" FOREIGN KEY ("id_despesas_parceladas") REFERENCES "DespesasParceladas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceConfig" ADD CONSTRAINT "FinanceConfig_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
