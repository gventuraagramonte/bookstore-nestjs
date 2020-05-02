import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1588226731116 implements MigrationInterface {
    name = 'firstMigration1588226731116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "/users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_397b9c50fa65f4355f96449304d" UNIQUE ("username"), CONSTRAINT "PK_e8b7a15e01cc145cfc1ec187fa0" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "/users"`, undefined);
    }

}
