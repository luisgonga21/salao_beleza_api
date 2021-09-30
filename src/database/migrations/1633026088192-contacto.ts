import {MigrationInterface, QueryRunner} from "typeorm";

export class contacto1633026088192 implements MigrationInterface {
    name = 'contacto1633026088192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6f4aa7abb5c8b124929f6e4c35a" UNIQUE ("description"), CONSTRAINT "PK_fcab8128cce0aac92da26cf1883" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacto"`);
    }

}
