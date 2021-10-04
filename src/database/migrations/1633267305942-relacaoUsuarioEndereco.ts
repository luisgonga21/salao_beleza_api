import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoUsuarioEndereco1633267305942 implements MigrationInterface {
    name = 'relacaoUsuarioEndereco1633267305942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "enderecoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6f962678dc18e5ec715e370e95e" FOREIGN KEY ("enderecoId") REFERENCES "endereco"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6f962678dc18e5ec715e370e95e"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "enderecoId"`);
    }

}
