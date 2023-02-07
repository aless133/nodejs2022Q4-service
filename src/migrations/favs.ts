import { MigrationInterface, QueryRunner } from "typeorm";

export class createFavs1675763292000 implements MigrationInterface {
    name = 'createFavs1675763292000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favs" ("table" character varying NOT NULL, "id" character varying NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favs"`);
    }

}
