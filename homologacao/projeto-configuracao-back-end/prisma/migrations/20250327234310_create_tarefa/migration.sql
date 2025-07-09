-- CreateTable
CREATE TABLE `Tarefa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL,
    `data_prevista` DATETIME(3) NOT NULL,
    `data_encerramento` DATETIME(3) NULL,
    `situacao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
