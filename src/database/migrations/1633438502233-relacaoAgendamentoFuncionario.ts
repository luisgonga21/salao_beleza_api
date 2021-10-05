import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoAgendamentoFuncionario1633438502233 implements MigrationInterface {
    name = 'relacaoAgendamentoFuncionario1633438502233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" ADD "funcionarioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "agendamento" ADD CONSTRAINT "FK_451019e95525cf62fdc2d3c89dc" FOREIGN KEY ("funcionarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" DROP CONSTRAINT "FK_451019e95525cf62fdc2d3c89dc"`);
        await queryRunner.query(`ALTER TABLE "agendamento" DROP COLUMN "funcionarioId"`);
    }

}
