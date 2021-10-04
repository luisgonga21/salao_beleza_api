import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoUsuarioCargos1633113344985 implements MigrationInterface {
    name = 'relacaoUsuarioCargos1633113344985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "cargoId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_7db14c51775d26f3fdbd0a88cde" FOREIGN KEY ("cargoId") REFERENCES "cargo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_7db14c51775d26f3fdbd0a88cde"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "cargoId"`);
    }

}
