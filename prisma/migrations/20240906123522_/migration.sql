-- CreateEnum
CREATE TYPE "Status" AS ENUM ('GENERATING', 'SENT', 'APPROVED', 'NEGOTIATING', 'REPROVED');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK', 'WHITE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'CLIENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amazonMail" TEXT,
    "amazonPassword" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerOrder" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,
    "maxDate" TIMESTAMP(3),
    "assuranceDate" TIMESTAMP(3),
    "sentDate" TIMESTAMP(3),
    "negotiatingDate" TIMESTAMP(3),
    "reprovedDate" TIMESTAMP(3),
    "approvedDate" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "CustomerOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "videoUrl" TEXT,
    "brand" TEXT,
    "assuranceDate" TIMESTAMP(3),
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photoUrl" TEXT,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomProduct" (
    "productId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "productCost" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "eletricianCost" DOUBLE PRECISION NOT NULL,
    "instalationCost" DOUBLE PRECISION NOT NULL,
    "materialCost" DOUBLE PRECISION NOT NULL,
    "maxDate" TIMESTAMP(3) NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RoomProduct_pkey" PRIMARY KEY ("productId","roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "CustomerOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomProduct" ADD CONSTRAINT "RoomProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomProduct" ADD CONSTRAINT "RoomProduct_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
