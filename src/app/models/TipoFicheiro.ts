import 'reflect-metadata'
import { Column, 
  Entity,
  OneToMany, 
  PrimaryGeneratedColumn, 
} from "typeorm";
import Ficheiro from './Ficheiro';
 
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

  @OneToMany(() => Ficheiro, (ficheiro) => ficheiro)
  Ficheiros: Ficheiro[];

}

export default TipoFicheiro;