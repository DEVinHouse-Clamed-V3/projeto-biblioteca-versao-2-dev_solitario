import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBooksTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "books",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true, // Pode ser opcional
          },
          {
            name: "publication_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "isbn",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "page_count",
            type: "int",
            isNullable: false,
          },
          {
            name: "language",
            type: "varchar",
            length: "10", // Exemplo: 'EN', 'PT', 'ES'
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("books");
  }
}
