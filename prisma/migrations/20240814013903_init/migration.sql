/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `DespesasParceladas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `DespesasParceladas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DespesasParceladas" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DespesasParceladas_user_id_key" ON "DespesasParceladas"("user_id");

-- AddForeignKey
ALTER TABLE "DespesasParceladas" ADD CONSTRAINT "DespesasParceladas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
