/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StoreUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `content_json` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Template` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Store";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StoreUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SiteUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "site_id" INTEGER NOT NULL,
    CONSTRAINT "SiteUser_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SiteUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL DEFAULT '{}',
    "schema" TEXT NOT NULL DEFAULT '{}',
    "site_id" INTEGER,
    CONSTRAINT "Template_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Template" ("active", "id", "name") SELECT "active", "id", "name" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
CREATE UNIQUE INDEX "Template_site_id_key" ON "Template"("site_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
