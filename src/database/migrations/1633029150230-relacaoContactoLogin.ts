import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoContactoLogin1633029150230 implements MigrationInterface {
    name = 'relacaoContactoLogin1633029150230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" ADD "contactoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "UQ_cac2db44840cd3628678339c75c" UNIQUE ("contactoId")`);
        await queryRunner.query(`ALTER TABLE "login" ADD CONSTRAINT "FK_cac2db44840cd3628678339c75c" FOREIGN KEY ("contactoId") REFERENCES "contacto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "FK_cac2db44840cd3628678339c75c"`);
        await queryRunner.query(`ALTER TABLE "login" DROP CONSTRAINT "UQ_cac2db44840cd3628678339c75c"`);
        await queryRunner.query(`ALTER TABLE "login" DROP COLUMN "contactoId"`);
    }

}
