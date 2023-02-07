import { MigrationInterface, QueryRunner } from "typeorm";

export class createGenerated1675778236081 implements MigrationInterface {
    name = 'createGenerated1675778236081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdAt" bigint NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedAt" bigint NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedAt" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdAt" integer NOT NULL
        `);
    }

}
