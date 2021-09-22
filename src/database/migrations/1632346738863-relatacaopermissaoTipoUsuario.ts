import {MigrationInterface, QueryRunner} from "typeorm";

export class relatacaopermissaoTipoUsuario1632346738863 implements MigrationInterface {
    name = 'relatacaopermissaoTipoUsuario1632346738863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissao_tipoUsuario" ("tipoUsuario_id" uuid NOT NULL, "permissao_id" uuid NOT NULL, CONSTRAINT "PK_b0dead64658e4f96eec2b045ece" PRIMARY KEY ("tipoUsuario_id", "permissao_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d7e28bf6fbced89f9775015b9e" ON "permissao_tipoUsuario" ("tipoUsuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4fa340ecaf87ec2c997f8008e" ON "permissao_tipoUsuario" ("permissao_id") `);
        await queryRunner.query(`ALTER TABLE "permissao_tipoUsuario" ADD CONSTRAINT "FK_d7e28bf6fbced89f9775015b9e2" FOREIGN KEY ("tipoUsuario_id") REFERENCES "tipoUsuario"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissao_tipoUsuario" ADD CONSTRAINT "FK_f4fa340ecaf87ec2c997f8008eb" FOREIGN KEY ("permissao_id") REFERENCES "permissao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissao_tipoUsuario" DROP CONSTRAINT "FK_f4fa340ecaf87ec2c997f8008eb"`);
        await queryRunner.query(`ALTER TABLE "permissao_tipoUsuario" DROP CONSTRAINT "FK_d7e28bf6fbced89f9775015b9e2"`);
        await queryRunner.query(`DROP INDEX "IDX_f4fa340ecaf87ec2c997f8008e"`);
        await queryRunner.query(`DROP INDEX "IDX_d7e28bf6fbced89f9775015b9e"`);
        await queryRunner.query(`DROP TABLE "permissao_tipoUsuario"`);
    }

}
