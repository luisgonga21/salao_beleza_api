import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoEnderecoMunicipio1633256956306 implements MigrationInterface {
    name = 'relacaoEnderecoMunicipio1633256956306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" ADD "municipioId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "endereco" ADD CONSTRAINT "FK_f0d5e94f02e3405054472825b2b" FOREIGN KEY ("municipioId") REFERENCES "municipio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" DROP CONSTRAINT "FK_f0d5e94f02e3405054472825b2b"`);
        await queryRunner.query(`ALTER TABLE "endereco" DROP COLUMN "municipioId"`);
    }

}
