-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_parentReplyId_fkey";

-- AlterTable
ALTER TABLE "Reply" ALTER COLUMN "parentReplyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
