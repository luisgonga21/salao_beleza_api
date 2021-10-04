import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoEnderecoBairro1633257367103 implements MigrationInterface {
    name = 'relacaoEnderecoBairro1633257367103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" ADD "bairroId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "endereco" ADD CONSTRAINT "FK_9c99b77fd3f5e4bdacb697e6569" FOREIGN KEY ("bairroId") REFERENCES "bairro"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" DROP CONSTRAINT "FK_9c99b77fd3f5e4bdacb697e6569"`);
        await queryRunner.query(`ALTER TABLE "endereco" DROP COLUMN "bairroId"`);
    }

}
