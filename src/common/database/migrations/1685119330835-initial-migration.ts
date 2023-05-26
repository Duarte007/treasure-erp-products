import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1685119330835 implements MigrationInterface {
  name = 'initialMigration1685119330835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "stock" ("stock_id" SERIAL NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_535f28fb720127de0997a5a866e" PRIMARY KEY ("stock_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("product_id" SERIAL NOT NULL, "product_uuid" uuid NOT NULL, "product_name" character varying(255) NOT NULL, "product_description" text NOT NULL, "product_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_product_uuid" ON "products" ("product_uuid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_375ba760c8cff338fc8c94b416c" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_375ba760c8cff338fc8c94b416c"`,
    );
    await queryRunner.query(`DROP INDEX "idx_product_uuid"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "stock"`);
  }
}
