import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import TipoUsuario from "./TipoUsuario";

@Entity("permissao")
class Permissao {
    @PrimaryGeneratedColumn("uuid")
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

    @OneToMany(() => TipoUsuario, (tipoUsuario) => tipoUsuario)
    TipoUsuarios: TipoUsuario[];

}


export default Permissao;