import {MigrationInterface, QueryRunner} from "typeorm";

export class relationMunicipioBairro1632049985917 implements MigrationInterface {
    name = 'relationMunicipioBairro1632049985917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bairro" ADD "municipioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bairro" ADD CONSTRAINT "FK_85399a4512761a43cc822ca00df" FOREIGN KEY ("municipioId") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bairro" DROP CONSTRAINT "FK_85399a4512761a43cc822ca00df"`);
        await queryRunner.query(`ALTER TABLE "bairro" DROP COLUMN "municipioId"`);
    }

}
