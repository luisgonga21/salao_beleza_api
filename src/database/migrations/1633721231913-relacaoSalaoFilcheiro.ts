import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoSalaoFilcheiro1633721231913 implements MigrationInterface {
    name = 'relacaoSalaoFilcheiro1633721231913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salao" ADD "logotipoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salao" ADD CONSTRAINT "UQ_dbe738aa859de6aae69bb1d871a" UNIQUE ("logotipoId")`);
        await queryRunner.query(`ALTER TABLE "salao" ADD CONSTRAINT "FK_dbe738aa859de6aae69bb1d871a" FOREIGN KEY ("logotipoId") REFERENCES "ficheiro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salao" DROP CONSTRAINT "FK_dbe738aa859de6aae69bb1d871a"`);
        await queryRunner.query(`ALTER TABLE "salao" DROP CONSTRAINT "UQ_dbe738aa859de6aae69bb1d871a"`);
        await queryRunner.query(`ALTER TABLE "salao" DROP COLUMN "logotipoId"`);
    }

}
