-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Password" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "disabledAt" DATETIME,
    "createdAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Password" ("createdAt", "disabledAt", "enabled", "hash", "id", "userId") SELECT "createdAt", "disabledAt", "enabled", "hash", "id", "userId" FROM "Password";
DROP TABLE "Password";
ALTER TABLE "new_Password" RENAME TO "Password";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
