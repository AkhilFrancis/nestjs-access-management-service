import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1712580270208 implements MigrationInterface {
    name = '$npmConfigName1712580270208';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_key" ADD "rateLimitPeriod" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_key" DROP COLUMN "rateLimitPeriod"`);
    }

}
