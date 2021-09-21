import {MigrationInterface, QueryRunner} from "typeorm";

export class pagarSalario1632167876276 implements MigrationInterface {
    name = 'pagarSalario1632167876276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pagarSalario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valorPago" double precision NOT NULL, "valorFalta" double precision NOT NULL, "numeroTransacao" character varying, "dataPagamento" date NOT NULL DEFAULT now(), CONSTRAINT "PK_a751136f8d422a8465eac7288dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pagarSalario"`);
    }

}
