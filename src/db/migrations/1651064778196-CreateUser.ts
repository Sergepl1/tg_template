import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1651064778196 implements MigrationInterface {
    name = 'CreateUser1651064778196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."user" ("id" SERIAL NOT NULL, "chat_id" character varying NOT NULL, "user_name" character varying NOT NULL, "data" jsonb NOT NULL, CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."user"`);
    }

}
