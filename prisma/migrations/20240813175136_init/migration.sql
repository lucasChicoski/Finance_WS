/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Despesas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Despesas_hash_key" ON "Despesas"("hash");
