import {MigrationInterface, QueryRunner} from "typeorm";

export class removeColumnImageFromBooks1672225409320 implements MigrationInterface {
    name = 'removeColumnImageFromBooks1672225409320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "image" character varying NOT NULL`);
    }

}
