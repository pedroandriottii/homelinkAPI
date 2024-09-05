-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APROVADO', 'NEGOCIANDO', 'REPROVADO');

-- CreateEnum
CREATE TYPE "Cor" AS ENUM ('PRETO', 'BRANCO');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'CLIENT');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email_amazon" TEXT,
    "senha_amazon" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" TEXT NOT NULL,
    "data_orcamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "orcado" BOOLEAN NOT NULL,
    "status" "Status" NOT NULL,
    "prazo_final" TIMESTAMP(3),
    "garantia_instalacao" INTEGER,
    "data_negociando" TIMESTAMP(3),
    "data_aprovado" TIMESTAMP(3),
    "data_reprovado" TIMESTAMP(3),
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" "Cor" NOT NULL,
    "link_video" TEXT,
    "garantia" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambiente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "foto" TEXT,
    "preco_ambiente" DOUBLE PRECISION NOT NULL,
    "orcamentoId" TEXT NOT NULL,

    CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioProduto" (
    "usuarioId" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioProduto_pkey" PRIMARY KEY ("usuarioId","produtoId")
);

-- CreateTable
CREATE TABLE "AmbienteProduto" (
    "produtoId" INTEGER NOT NULL,
    "ambienteId" INTEGER NOT NULL,
    "valor_produto" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_eletricista" DOUBLE PRECISION NOT NULL,
    "valor_instalacao" DOUBLE PRECISION NOT NULL,
    "valor_material" DOUBLE PRECISION NOT NULL,
    "prazo_entrega" TIMESTAMP(3) NOT NULL,
    "valor_final" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AmbienteProduto_pkey" PRIMARY KEY ("produtoId","ambienteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ambiente" ADD CONSTRAINT "Ambiente_orcamentoId_fkey" FOREIGN KEY ("orcamentoId") REFERENCES "Orcamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioProduto" ADD CONSTRAINT "UsuarioProduto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioProduto" ADD CONSTRAINT "UsuarioProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmbienteProduto" ADD CONSTRAINT "AmbienteProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmbienteProduto" ADD CONSTRAINT "AmbienteProduto_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
