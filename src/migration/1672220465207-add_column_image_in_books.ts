import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnImageInBooks1672220465207 implements MigrationInterface {
    name = 'addColumnImageInBooks1672220465207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image"`);
    }

}
