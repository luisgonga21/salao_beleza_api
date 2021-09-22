import {MigrationInterface, QueryRunner} from "typeorm";

export class permissao1632340426069 implements MigrationInterface {
    name = 'permissao1632340426069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissao" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_28ff4b3ae798fa9f16f6665d68d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "permissao"`);
    }

}
