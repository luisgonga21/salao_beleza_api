import {MigrationInterface, QueryRunner} from "typeorm";

export class salao1632135558617 implements MigrationInterface {
    name = 'salao1632135558617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "salao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nif" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fd835fa4cdcbcdef02190bef693" UNIQUE ("nif"), CONSTRAINT "PK_39023ebd7217f011abbbb72eabd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "salao"`);
    }

}
