import {MigrationInterface, QueryRunner} from "typeorm";

export class usersNotNull1643911712761 implements MigrationInterface {
    name = 'usersNotNull1643911712761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordExpires" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordExpires" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "resetPasswordCode" SET NOT NULL`);
    }

}
