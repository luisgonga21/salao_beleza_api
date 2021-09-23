import {MigrationInterface, QueryRunner} from "typeorm";

export class agendamento1632436941761 implements MigrationInterface {
    name = 'agendamento1632436941761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dataAgendamento" date NOT NULL, "cancelamento" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a102b15cfec9ce6d8ac6193345f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "agendamento"`);
    }

}
