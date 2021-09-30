import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoFicheiroTipoFicheiro1633020366115 implements MigrationInterface {
    name = 'relacaoFicheiroTipoFicheiro1633020366115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ficheiro" ADD "tipoFicheiroId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ficheiro" ADD CONSTRAINT "FK_27c020121a78db7e2826053db80" FOREIGN KEY ("tipoFicheiroId") REFERENCES "tipoFicheiro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ficheiro" DROP CONSTRAINT "FK_27c020121a78db7e2826053db80"`);
        await queryRunner.query(`ALTER TABLE "ficheiro" DROP COLUMN "tipoFicheiroId"`);
    }

}
