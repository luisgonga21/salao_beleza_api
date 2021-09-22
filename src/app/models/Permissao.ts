import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("permissao")
class Permissao {
    @PrimaryGeneratedColumn("increment")
    id: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    name: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    description: string;

}


export default Permissao;