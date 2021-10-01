import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoContactoUsuario1633026503144 implements MigrationInterface {
    name = 'relacaoContactoUsuario1633026503144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" ADD "usuarioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_9c826cf101fb51e08d7bdfb9757"`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP COLUMN "usuarioId"`);
    }

}
