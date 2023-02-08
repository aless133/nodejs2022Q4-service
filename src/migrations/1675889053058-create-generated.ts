import { MigrationInterface, QueryRunner } from "typeorm";

export class createGenerated1675889053058 implements MigrationInterface {
    name = 'createGenerated1675889053058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "version" integer NOT NULL,
                "createdAt" bigint NOT NULL,
                "updatedAt" bigint NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tracks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "artistId" character varying,
                "albumId" character varying,
                "duration" integer NOT NULL,
                CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "artists" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "grammy" boolean NOT NULL,
                CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "albums" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "year" integer NOT NULL,
                "artistId" character varying,
                CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "favs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "table" character varying NOT NULL,
                "entityId" character varying NOT NULL,
                CONSTRAINT "PK_2fde25c80bd089c0fa0e7986409" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "favs"
        `);
        await queryRunner.query(`
            DROP TABLE "albums"
        `);
        await queryRunner.query(`
            DROP TABLE "artists"
        `);
        await queryRunner.query(`
            DROP TABLE "tracks"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
