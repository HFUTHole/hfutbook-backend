/*
  Warnings:

  - You are about to drop the `PostOnCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostOnCategory" DROP CONSTRAINT "PostOnCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnCategory" DROP CONSTRAINT "PostOnCategory_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PostOnCategory";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
