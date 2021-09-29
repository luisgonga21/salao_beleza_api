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
import Usuario from "./Usuario";
import Permissao from "./Permissao"
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

  @Column("uuid")
  permissaoId: string;
  @ManyToOne(() => Permissao, (permissao) => permissao, { eager: true })
  @JoinColumn({ name: 'permissaoId' })
  PermissaoId: Permissao;
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default TipoUsuario;