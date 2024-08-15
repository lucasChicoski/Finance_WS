-- DropForeignKey
ALTER TABLE "Despesas" DROP CONSTRAINT "Despesas_id_despesas_parceladas_fkey";

-- AlterTable
ALTER TABLE "Despesas" ALTER COLUMN "id_despesas_parceladas" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Despesas" ADD CONSTRAINT "Despesas_id_despesas_parceladas_fkey" FOREIGN KEY ("id_despesas_parceladas") REFERENCES "DespesasParceladas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
