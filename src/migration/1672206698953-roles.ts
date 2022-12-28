import {MigrationInterface, QueryRunner} from "typeorm";

export class roles1672206698953 implements MigrationInterface {
    name = 'roles1672206698953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("role_id" SERIAL NOT NULL, "role_name" character varying NOT NULL, "is_active" integer NOT NULL DEFAULT '1', "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
