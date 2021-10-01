import {MigrationInterface, QueryRunner} from "typeorm";

export class usuario1632912851515 implements MigrationInterface {
    name = 'usuario1632912851515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "usuario_genero_enum" AS ENUM('Masculino', 'Feminino', '')`);
        await queryRunner.query(`CREATE TYPE "usuario_estadocivil_enum" AS ENUM('Casado', 'Solteiro', '')`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "numeroBi" character varying NOT NULL, "genero" "usuario_genero_enum" NOT NULL, "estadoCivil" "usuario_estadocivil_enum", "dataNascimento" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd6537bcf49307e83f6a8d14e10" UNIQUE ("numeroBi"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TYPE "usuario_estadocivil_enum"`);
        await queryRunner.query(`DROP TYPE "usuario_genero_enum"`);
    }

}
