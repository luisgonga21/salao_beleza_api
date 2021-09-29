import { Column, 
  CreateDateColumn, 
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
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
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default TipoUsuario;