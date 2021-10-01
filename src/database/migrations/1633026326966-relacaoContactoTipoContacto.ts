import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoContactoTipoContacto1633026326966 implements MigrationInterface {
    name = 'relacaoContactoTipoContacto1633026326966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" ADD "tipoContactoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contacto" ADD CONSTRAINT "FK_03063f55a5b972db14f2a7641b0" FOREIGN KEY ("tipoContactoId") REFERENCES "tipoContacto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacto" DROP CONSTRAINT "FK_03063f55a5b972db14f2a7641b0"`);
        await queryRunner.query(`ALTER TABLE "contacto" DROP COLUMN "tipoContactoId"`);
    }

}
