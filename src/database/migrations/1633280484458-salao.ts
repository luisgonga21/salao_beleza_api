import {MigrationInterface, QueryRunner} from "typeorm";

export class salao1633280484458 implements MigrationInterface {
    name = 'salao1633280484458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "salao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "nif" integer NOT NULL, "telefone1" integer NOT NULL, "telefone2" integer NOT NULL, "email" character varying NOT NULL, "quantidadeFuncionario" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fd835fa4cdcbcdef02190bef693" UNIQUE ("nif"), CONSTRAINT "UQ_cef708152c1939b191089c1e64b" UNIQUE ("telefone1"), CONSTRAINT "UQ_fda89841b33980fee05be506fa7" UNIQUE ("telefone2"), CONSTRAINT "UQ_7b917ce90e86f48e4f6b7370329" UNIQUE ("email"), CONSTRAINT "PK_39023ebd7217f011abbbb72eabd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "salao"`);
    }

}
