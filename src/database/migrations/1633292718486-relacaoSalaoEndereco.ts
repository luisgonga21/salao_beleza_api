import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoSalaoEndereco1633292718486 implements MigrationInterface {
    name = 'relacaoSalaoEndereco1633292718486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salao" ADD "enderecoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salao" ADD CONSTRAINT "FK_e3cf4f56df80f0ebe3484fb9b0d" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "salao" DROP CONSTRAINT "FK_e3cf4f56df80f0ebe3484fb9b0d"`);
        await queryRunner.query(`ALTER TABLE "salao" DROP COLUMN "enderecoId"`);
    }

}
