import {MigrationInterface, QueryRunner} from "typeorm";

export class usersInvalidCode1643912741976 implements MigrationInterface {
    name = 'usersInvalidCode1643912741976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordCode" SET DEFAULT 'invalid'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordCode" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordCode" DROP NOT NULL`);
    }

}
