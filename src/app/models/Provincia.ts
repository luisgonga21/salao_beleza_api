import { Column, 
  CreateDateColumn, 
  Entity,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
import Endereco from "./Endereco";
import Municipio from './Municipio';


@Entity("provincia")
class Provincia {
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

  @OneToMany(() => Municipio, (municipio) => municipio)
  Municipios: Municipio[];

  @OneToMany(() => Endereco, (endereco) => endereco)
  Enderecos: Endereco[];
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default Provincia;