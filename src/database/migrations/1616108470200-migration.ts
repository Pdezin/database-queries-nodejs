import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1616108470200 implements MigrationInterface {
  name = 'migration1616108470200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "genres" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b56517b5595af982d66437" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "value" decimal(7,2) NOT NULL, "customerId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b26b56517b5595af982d89107" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "genreId" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))',
    );

    await queryRunner.query(
      'CREATE INDEX "IDX_77880d8f9d1231c97d3876ad32" ON "orders" ("customerId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "orders" ADD CONSTRAINT "FK_667743d029d8333de929aae5c35a" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'CREATE INDEX "IDX_933b0d8f9d1231c97d3876ad32" ON "games" ("genreId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "games" ADD CONSTRAINT "FK_e5263d029d8333de929aae5c35a" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'CREATE TABLE "users_games_games" ("usersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_cd4067d574477fd5c7693bc7872" PRIMARY KEY ("usersId", "gamesId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_e5263d029d8644de829aae5c35" ON "users_games_games" ("usersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_934b0d8f9d0084c97d3876ad32" ON "users_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_e5263d029d8644de829aae5c35a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" ADD CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

    await queryRunner.query(
      'CREATE TABLE "orders_games_games" ("ordersId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_cd8888574477fd5c7693bc7872" PRIMARY KEY ("ordersId", "gamesId"))',
    );

    await queryRunner.query(
      'CREATE INDEX "IDX_9999a29d8644de829aae5c35" ON "orders_games_games" ("ordersId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_8888bbd8f9d0084c97d3876ad32" ON "orders_games_games" ("gamesId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_7777029d8644de829aae5c35a" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" ADD CONSTRAINT "FK_66660d8f9d0084c97d3876ad32d" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_66660d8f9d0084c97d3876ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_games_games" DROP CONSTRAINT "FK_7777029d8644de829aae5c35a"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_934b0d8f9d0084c97d3876ad32d"',
    );
    await queryRunner.query(
      'ALTER TABLE "users_games_games" DROP CONSTRAINT "FK_e5263d029d8644de829aae5c35a"',
    );
    await queryRunner.query(
      'ALTER TABLE "games" DROP CONSTRAINT "FK_e5263d029d8333de929aae5c35a"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders" DROP CONSTRAINT "FK_667743d029d8333de929aae5c35a"',
    );

    await queryRunner.query('DROP INDEX "IDX_9999a29d8644de829aae5c35"');
    await queryRunner.query('DROP INDEX "IDX_8888bbd8f9d0084c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_934b0d8f9d0084c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_e5263d029d8644de829aae5c35"');
    await queryRunner.query('DROP INDEX "IDX_933b0d8f9d1231c97d3876ad32"');
    await queryRunner.query('DROP INDEX "IDX_77880d8f9d1231c97d3876ad32"');
    await queryRunner.query('DROP TABLE "orders_games_games"');
    await queryRunner.query('DROP TABLE "users_games_games"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "genres"');
    await queryRunner.query('DROP TABLE "games"');
    await queryRunner.query('DROP TABLE "users"');
  }
}
