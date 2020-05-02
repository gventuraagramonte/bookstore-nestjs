import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserDetails1588394940509 implements MigrationInterface {
    name = 'fixUserDetails1588394940509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "/users" ADD "detail_id" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "/users" ADD CONSTRAINT "UQ_1c2ba5f1721445e38b36f1e9eb8" UNIQUE ("detail_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "/users" ADD CONSTRAINT "FK_1c2ba5f1721445e38b36f1e9eb8" FOREIGN KEY ("detail_id") REFERENCES "/user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "/users" DROP CONSTRAINT "FK_1c2ba5f1721445e38b36f1e9eb8"`, undefined);
        await queryRunner.query(`ALTER TABLE "/users" DROP CONSTRAINT "UQ_1c2ba5f1721445e38b36f1e9eb8"`, undefined);
        await queryRunner.query(`ALTER TABLE "/users" DROP COLUMN "detail_id"`, undefined);
    }

}
