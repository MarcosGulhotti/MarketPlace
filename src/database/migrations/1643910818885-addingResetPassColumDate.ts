import {MigrationInterface, QueryRunner} from "typeorm";

export class addingResetPassColumDate1643910818885 implements MigrationInterface {
    name = 'addingResetPassColumDate1643910818885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "resetPasswordExpires" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetPasswordExpires"`);
    }

}
