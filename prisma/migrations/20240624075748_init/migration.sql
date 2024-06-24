/*
  Warnings:

  - You are about to drop the column `address` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `bloodGroup` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `donors` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `recipients` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `recipients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "donors_email_key";

-- DropIndex
DROP INDEX "recipients_email_key";

-- AlterTable
ALTER TABLE "donors" DROP COLUMN "address",
DROP COLUMN "bloodGroup",
DROP COLUMN "contactNo",
DROP COLUMN "date_of_birth",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "gender",
DROP COLUMN "image",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "recipients" DROP COLUMN "address",
DROP COLUMN "contactNo",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "image",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "users" (
    "gender" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "bloodGroup" "BloodGroup" NOT NULL DEFAULT 'A_POSITIVE',
    "contactNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" DEFAULT 'donor'
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
