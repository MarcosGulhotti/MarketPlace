import {MigrationInterface, QueryRunner} from "typeorm";

export class addingResetPassColum1643910509714 implements MigrationInterface {
    name = 'addingResetPassColum1643910509714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "resetPasswordCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetPasswordCode"`);
    }

}
