import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1712572820172 implements MigrationInterface {
    name = ' $npmConfigName1712572820172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "access_key" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rateLimit" integer NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_8bff331b150893bb5833f6e5675" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "access_key"`);
    }

}
