-- CreateTable
CREATE TABLE "Mail" (
    "id" TEXT NOT NULL,
    "mailType" TEXT NOT NULL DEFAULT 'reminder',
    "reminder" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "jobApplicationId" TEXT NOT NULL,

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
