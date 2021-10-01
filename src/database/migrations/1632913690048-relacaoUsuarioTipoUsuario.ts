import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoUsuarioTipoUsuario1632913690048 implements MigrationInterface {
    name = 'relacaoUsuarioTipoUsuario1632913690048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "tipoUsuarioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_839a74b9952fd140d2c957e9e44" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipoUsuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_839a74b9952fd140d2c957e9e44"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "tipoUsuarioId"`);
    }

}
