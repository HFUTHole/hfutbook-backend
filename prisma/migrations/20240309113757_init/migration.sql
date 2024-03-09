-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "backgroundImg" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteItem" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "VoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteItemsOnUsers" (
    "voteId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PostOnCategory" (
    "postId" INTEGER NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Category_id_name_idx" ON "Category"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_postId_key" ON "Vote"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_id_postId_key" ON "Vote"("id", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "VoteItemsOnUsers_voteId_userId_key" ON "VoteItemsOnUsers"("voteId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PostOnCategory_postId_categoryId_key" ON "PostOnCategory"("postId", "categoryId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteItemsOnUsers" ADD CONSTRAINT "VoteItemsOnUsers_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "VoteItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteItemsOnUsers" ADD CONSTRAINT "VoteItemsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnCategory" ADD CONSTRAINT "PostOnCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnCategory" ADD CONSTRAINT "PostOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
