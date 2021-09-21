import {MigrationInterface, QueryRunner} from "typeorm";

export class tipoPagamento1632254546417 implements MigrationInterface {
    name = 'tipoPagamento1632254546417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipoPagamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_fb57010d7a88f67894bdd21ed47" PRIMARY KEY ("id"))`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tipoPagamento"`);
    }

}
