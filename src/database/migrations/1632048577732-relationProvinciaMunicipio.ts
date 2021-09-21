import {MigrationInterface, QueryRunner} from "typeorm";

export class relationProvinciaMunicipio1632048577732 implements MigrationInterface {
    name = 'relationProvinciaMunicipio1632048577732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "municipio" ADD "provinciaId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "municipio" ADD CONSTRAINT "FK_b0f3c864cd42df40eca3b81ad41" FOREIGN KEY ("provinciaId") REFERENCES "provincia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "municipio" DROP CONSTRAINT "FK_b0f3c864cd42df40eca3b81ad41"`);
        await queryRunner.query(`ALTER TABLE "municipio" DROP COLUMN "provinciaId"`);
    }

}
