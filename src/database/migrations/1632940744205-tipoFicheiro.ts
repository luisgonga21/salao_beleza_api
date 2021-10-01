import {MigrationInterface, QueryRunner} from "typeorm";

export class tipoFicheiro1632940744205 implements MigrationInterface {
    name = 'tipoFicheiro1632940744205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipoFicheiro" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "descricao" character varying, CONSTRAINT "PK_df4d533c2437ded9bc3d9da418b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipoFicheiro"`);
    }

}
