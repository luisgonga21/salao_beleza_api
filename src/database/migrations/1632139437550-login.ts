import {MigrationInterface, QueryRunner} from "typeorm";

export class login1632139437550 implements MigrationInterface {
    name = 'login1632139437550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying NOT NULL, CONSTRAINT "PK_0e29aa96b7d3fb812ff43fcfcd3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "login"`);
    }

}
