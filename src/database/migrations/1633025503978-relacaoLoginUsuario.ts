import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoLoginUsuario1633025503978 implements MigrationInterface {
    name = 'relacaoLoginUsuario1633025503978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" ADD "usuarioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "UQ_dc52632bee883d991c3a6b36c62" UNIQUE ("usuarioId")`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_dc52632bee883d991c3a6b36c62" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_dc52632bee883d991c3a6b36c62"`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "UQ_dc52632bee883d991c3a6b36c62"`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "usuarioId"`);
    }

}
