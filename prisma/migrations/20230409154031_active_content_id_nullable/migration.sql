/*
  Warnings:

  - You are about to drop the column `content` on the `Template` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TemplateContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '{}',
    "template_id" INTEGER NOT NULL,
    CONSTRAINT "TemplateContent_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "schema" TEXT NOT NULL DEFAULT '{}',
    "active_content_id" INTEGER,
    "site_id" INTEGER,
    CONSTRAINT "Template_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Template" ("active", "id", "name", "schema", "site_id") SELECT "active", "id", "name", "schema", "site_id" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
CREATE UNIQUE INDEX "Template_site_id_key" ON "Template"("site_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
