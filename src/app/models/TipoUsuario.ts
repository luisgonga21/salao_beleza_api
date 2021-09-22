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
import Permissao from "./Permissao";
 
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

  @ManyToMany(() => Permissao)
  @JoinTable({
      name: "permissao_tipoUsuario",
      joinColumns: [{name: "tipoUsuario_id"}],
      inverseJoinColumns: [{name: "permissao_id"}]
  })
  permissao: Permissao[];
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default TipoUsuario;