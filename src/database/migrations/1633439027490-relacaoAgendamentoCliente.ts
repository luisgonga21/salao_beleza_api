import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoAgendamentoCliente1633439027490 implements MigrationInterface {
    name = 'relacaoAgendamentoCliente1633439027490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" ADD "clienteId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_ad85077023b774f9e4d88b2cee8" FOREIGN KEY ("clienteId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_ad85077023b774f9e4d88b2cee8"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP COLUMN "clienteId"`);
    }

}
