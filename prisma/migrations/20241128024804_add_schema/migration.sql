-- CreateTable
CREATE TABLE "User" (
    "user_no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "created_dt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tweet" (
    "tweet_no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tweet" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userNo" INTEGER NOT NULL,
    CONSTRAINT "Tweet_userNo_fkey" FOREIGN KEY ("userNo") REFERENCES "User" ("user_no") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Like" (
    "no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userNo" INTEGER NOT NULL,
    "tweetNo" INTEGER NOT NULL,
    CONSTRAINT "Like_userNo_fkey" FOREIGN KEY ("userNo") REFERENCES "User" ("user_no") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Like_tweetNo_fkey" FOREIGN KEY ("tweetNo") REFERENCES "Tweet" ("tweet_no") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_no_key" ON "User"("user_no");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Tweet_tweet_no_key" ON "Tweet"("tweet_no");

-- CreateIndex
CREATE UNIQUE INDEX "Like_no_key" ON "Like"("no");
