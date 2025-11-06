/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `BorrowRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BorrowRecord_userId_bookId_isReturned_key";

-- CreateIndex
CREATE UNIQUE INDEX "BorrowRecord_userId_bookId_key" ON "BorrowRecord"("userId", "bookId");
