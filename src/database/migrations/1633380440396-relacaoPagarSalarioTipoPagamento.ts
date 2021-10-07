import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoPagarSalarioTipoPagamento1633380440396 implements MigrationInterface {
    name = 'relacaoPagarSalarioTipoPagamento1633380440396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagarSalario" ADD "tipoPagamentoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pagarSalario" ADD CONSTRAINT "FK_00beb92621a5f0757f4cf42aabe" FOREIGN KEY ("tipoPagamentoId") REFERENCES "tipoPagamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pagarSalario" DROP CONSTRAINT "FK_00beb92621a5f0757f4cf42aabe"`);
        await queryRunner.query(`ALTER TABLE "pagarSalario" DROP COLUMN "tipoPagamentoId"`);
    }

}
