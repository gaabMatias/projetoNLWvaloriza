import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTags1624470075424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Tags",
                columns:[{ 
                    name:"Tag_Id", 
                    type: "uuid",
                    isPrimary: true
                },{ 
                    name:"tag_Name",
                    type: "varchar",
                },{
                    name: "Created_at",
                    type: "timestamp",
                    default: "now()"
                },{
                    name: "Updated_at",
                    type: "timestamp",
                    default: "now()"
                }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Tags")
    }

}
