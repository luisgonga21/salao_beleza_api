import {MigrationInterface, QueryRunner} from "typeorm";

export class permissaoTipoUsuario1632921808060 implements MigrationInterface {
    name = 'permissaoTipoUsuario1632921808060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissaoTipoUsuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "permissaoId" uuid NOT NULL, "tipoUsuarioId" uuid NOT NULL, CONSTRAINT "PK_c7a8ba6c52b2c327b553a63358b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permissaoTipoUsuario" ADD CONSTRAINT "FK_516dd3784c5fc27cb12630305c2" FOREIGN KEY ("permissaoId") REFERENCES "permissao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissaoTipoUsuario" ADD CONSTRAINT "FK_2e8e9b63710faa9f8e79e00716b" FOREIGN KEY ("tipoUsuarioId") REFERENCES "tipoUsuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissaoTipoUsuario" DROP CONSTRAINT "FK_2e8e9b63710faa9f8e79e00716b"`);
        await queryRunner.query(`ALTER TABLE "permissaoTipoUsuario" DROP CONSTRAINT "FK_516dd3784c5fc27cb12630305c2"`);
        await queryRunner.query(`DROP TABLE "permissaoTipoUsuario"`);
    }

}
