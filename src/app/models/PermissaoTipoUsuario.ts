import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Permissao from "./Permissao";
import TipoUsuario from "./TipoUsuario";

@Entity("permissaoTipoUsuario")
class PermissaoTipoUsuario {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid")
    permissaoId: string;
    @ManyToOne(() => Permissao, (permissao) => permissao, { eager: true })
    @JoinColumn({ name: 'permissaoId' })
    PermissaoId: Permissao;

    @Column("uuid")
    tipoUsuarioId: string;
    @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario, { eager: true })
    @JoinColumn({ name: 'tipoUsuarioId' })
    TipoUsuarioId: TipoUsuario;

}


export default PermissaoTipoUsuario;  