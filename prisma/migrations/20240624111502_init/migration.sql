/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `donors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `recipients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "donors_id_key" ON "donors"("id");

-- CreateIndex
CREATE UNIQUE INDEX "recipients_id_key" ON "recipients"("id");

-- AddForeignKey
ALTER TABLE "donors" ADD CONSTRAINT "donors_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipients" ADD CONSTRAINT "recipients_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
