-- DropIndex
DROP INDEX "User_username_studentId_idx";

-- CreateIndex
CREATE INDEX "User_id_username_studentId_idx" ON "User"("id", "username", "studentId");
