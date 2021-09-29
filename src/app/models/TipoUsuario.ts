import { Column, 
  CreateDateColumn, 
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
import PermissaoTipoUsuario from "./PermissaoTipoUsuario";
import Usuario from "./Usuario";
@Entity("tipoUsuario")
class TipoUsuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({
    type:'varchar',
    nullable: false
  } )
  name: string;
  
  @Column({
    type:'varchar',
    nullable: true
  })
  description: string;

  @OneToMany(() => Usuario, (usuario) => usuario)
  Usuarios: Usuario[];

  @OneToMany(() => PermissaoTipoUsuario, (permissaoTipoUsuario) => permissaoTipoUsuario)
  PermissaoTipoUsuarios: PermissaoTipoUsuario[];
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default TipoUsuario;