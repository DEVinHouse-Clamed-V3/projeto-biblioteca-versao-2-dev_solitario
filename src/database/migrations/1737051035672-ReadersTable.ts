import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReadersTable1737051035672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "readers",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "int",
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "150",
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "20",
          },
          {
            name: "birthdate",
            type: "date",
          },
          {
            name: "address",
            type: "text",
          },
          {
            name: "status",
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
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("readers");
  }
}
