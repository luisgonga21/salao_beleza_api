import {MigrationInterface, QueryRunner} from "typeorm";

export class endereco1632046609516 implements MigrationInterface {
    name = 'endereco1632046609516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2a6880f71a7f8d1c677bb2a32a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
