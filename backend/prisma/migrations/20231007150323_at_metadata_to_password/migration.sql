/*
  Warnings:

  - Added the required column `enabled` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "disabledAt" DATETIME,
    "createdAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Password" ("createdAt", "hash", "id", "userId") SELECT "createdAt", "hash", "id", "userId" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
