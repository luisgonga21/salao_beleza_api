import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import PermissaoTipoUsuario from "./PermissaoTipoUsuario";

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

    @OneToMany(() => PermissaoTipoUsuario, (permissaoTipoUsuario) => permissaoTipoUsuario)
    PermissaoTipoUsuarios: PermissaoTipoUsuario[];

}


export default Permissao;