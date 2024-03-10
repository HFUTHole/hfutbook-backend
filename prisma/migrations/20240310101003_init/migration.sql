-- CreateTable
CREATE TABLE "UserLikeComments" (
    "commentId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER
);

-- CreateTable
CREATE TABLE "UserLikeReplies" (
    "replyId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLikeComments_commentId_userId_key" ON "UserLikeComments"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLikeReplies_replyId_userId_key" ON "UserLikeReplies"("replyId", "userId");

-- AddForeignKey
ALTER TABLE "UserLikeComments" ADD CONSTRAINT "UserLikeComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeComments" ADD CONSTRAINT "UserLikeComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeComments" ADD CONSTRAINT "UserLikeComments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeReplies" ADD CONSTRAINT "UserLikeReplies_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeReplies" ADD CONSTRAINT "UserLikeReplies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeReplies" ADD CONSTRAINT "UserLikeReplies_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
