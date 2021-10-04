import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoEnderecoProvincia1633257132912 implements MigrationInterface {
    name = 'relacaoEnderecoProvincia1633257132912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" ADD "provinciaId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "endereco" ADD CONSTRAINT "FK_9a4e64faafcf408fb02eafb2d26" FOREIGN KEY ("provinciaId") REFERENCES "provincia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endereco" DROP CONSTRAINT "FK_9a4e64faafcf408fb02eafb2d26"`);
        await queryRunner.query(`ALTER TABLE "endereco" DROP COLUMN "provinciaId"`);
    }

}
