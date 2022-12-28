import {MigrationInterface, QueryRunner} from "typeorm";

export class books1672220277986 implements MigrationInterface {
    name = 'books1672220277986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("book_id" SERIAL NOT NULL, "book_name" character varying NOT NULL, "description" character varying NOT NULL, "is_active" integer NOT NULL DEFAULT '1', "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_modified" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer, CONSTRAINT "PK_552bd343dabd693159e284fe517" PRIMARY KEY ("book_id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_1056dbee4616479f7d562c562df" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_1056dbee4616479f7d562c562df"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
