import {MigrationInterface, QueryRunner} from "typeorm";

export class permissao1632343192569 implements MigrationInterface {
    name = 'permissao1632343192569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_28ff4b3ae798fa9f16f6665d68d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "permissao"`);
    }

}
