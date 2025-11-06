/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BookCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookCategory_name_key" ON "BookCategory"("name");
