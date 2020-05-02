import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserDetailsEntity1588395082189 implements MigrationInterface {
    name = 'fixUserDetailsEntity1588395082189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_52272ac797e366c77422dcbe5ee"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_52272ac797e366c77422dcbe5e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME COLUMN "/usersId" TO "usersId"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME CONSTRAINT "PK_c33b2992a354fa5a2a9f9c3f909" TO "PK_38ffcfb865fc628fa337d9a0d4f"`, undefined);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "lastname" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "detail_id" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "user_details"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" TO "PK_c33b2992a354fa5a2a9f9c3f909"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" RENAME COLUMN "usersId" TO "/usersId"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_52272ac797e366c77422dcbe5e" ON "user_roles" ("/usersId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_52272ac797e366c77422dcbe5ee" FOREIGN KEY ("/usersId") REFERENCES "/users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
