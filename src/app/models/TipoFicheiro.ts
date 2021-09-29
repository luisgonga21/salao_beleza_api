import 'reflect-metadata'
import { Column, 
  CreateDateColumn, 
  Entity,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
 
@Entity("tipoFicheiro")
class TipoFicheiro {
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
  descricao: string;

}

export default TipoFicheiro;