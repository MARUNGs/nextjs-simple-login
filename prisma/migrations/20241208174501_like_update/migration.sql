/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `no` on the `Like` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "response_txt" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userNo" INTEGER NOT NULL,
    CONSTRAINT "Response_userNo_fkey" FOREIGN KEY ("userNo") REFERENCES "User" ("user_no") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userNo" INTEGER NOT NULL,
    "tweetNo" INTEGER NOT NULL,

    PRIMARY KEY ("userNo", "tweetNo"),
    CONSTRAINT "Like_userNo_fkey" FOREIGN KEY ("userNo") REFERENCES "User" ("user_no") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_tweetNo_fkey" FOREIGN KEY ("tweetNo") REFERENCES "Tweet" ("tweet_no") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("created_at", "tweetNo", "userNo") SELECT "created_at", "tweetNo", "userNo" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
