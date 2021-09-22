import {MigrationInterface, QueryRunner} from "typeorm";

export class cargo1632259176754 implements MigrationInterface {
    name = 'cargo1632259176754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cargo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "salario" integer NOT NULL, CONSTRAINT "PK_1af8b2a790f35aedbe7e3da4199" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cargo"`);
    }

}
