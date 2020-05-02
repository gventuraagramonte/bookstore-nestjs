import {MigrationInterface, QueryRunner} from "typeorm";

export class joinRolesUsers1588383892980 implements MigrationInterface {
    name = 'joinRolesUsers1588383892980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "/user_details" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "lastname" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_38982c649bf35c7f53bc4c373bd" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles" ("/usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_c33b2992a354fa5a2a9f9c3f909" PRIMARY KEY ("/usersId", "rolesId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_52272ac797e366c77422dcbe5e" ON "user_roles" ("/usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_52272ac797e366c77422dcbe5ee" FOREIGN KEY ("/usersId") REFERENCES "/users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_52272ac797e366c77422dcbe5ee"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_52272ac797e366c77422dcbe5e"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles"`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP TABLE "/user_details"`, undefined);
    }

}
