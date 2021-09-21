import {MigrationInterface, QueryRunner} from "typeorm";

export class usuario1632250051067 implements MigrationInterface {
    name = 'usuario1632250051067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "numeroBi" character varying NOT NULL, "dataNascimento" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cd6537bcf49307e83f6a8d14e10" UNIQUE ("numeroBi"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
