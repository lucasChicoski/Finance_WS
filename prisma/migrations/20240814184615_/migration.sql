/*
  Warnings:

  - You are about to drop the column `yarn` on the `Despesas` table. All the data in the column will be lost.
  - Added the required column `year` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Despesas" DROP COLUMN "yarn",
ADD COLUMN     "year" INTEGER NOT NULL;
