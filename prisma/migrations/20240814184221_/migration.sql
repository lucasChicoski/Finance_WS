/*
  Warnings:

  - Added the required column `yarn` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Despesas" ADD COLUMN     "yarn" INTEGER NOT NULL;
