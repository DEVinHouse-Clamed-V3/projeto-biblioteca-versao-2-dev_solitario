import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AuthorsTable1737214219336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "authors",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "150",
            isNullable: false,
          },
          {
            name: "birthdate",
            type: "date",
          },
          {
            name: "biography",
            type: "text",
          },
          {
            name: "nacionality",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("authors");
  }
}
