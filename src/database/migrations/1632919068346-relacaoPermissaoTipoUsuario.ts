import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoPermissaoTipoUsuario1632919068346 implements MigrationInterface {
    name = 'relacaoPermissaoTipoUsuario1632919068346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipoUsuario" ADD "permissaoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tipoUsuario" ADD CONSTRAINT "FK_bfa232a75370996ccffc81ce6e5" FOREIGN KEY ("permissaoId") REFERENCES "permissao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tipoUsuario" DROP CONSTRAINT "FK_bfa232a75370996ccffc81ce6e5"`);
        await queryRunner.query(`ALTER TABLE "tipoUsuario" DROP COLUMN "permissaoId"`);
    }

}
