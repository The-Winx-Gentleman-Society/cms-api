/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `data` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Template` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TemplateProduct";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StoreUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    CONSTRAINT "StoreUser_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StoreUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "content_json" TEXT NOT NULL DEFAULT '{}',
    "store_id" INTEGER,
    CONSTRAINT "Template_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Template" ("id", "name") SELECT "id", "name" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
CREATE UNIQUE INDEX "Template_store_id_key" ON "Template"("store_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
