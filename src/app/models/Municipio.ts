
import 'reflect-metadata'
import { Column, 
  CreateDateColumn, 
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
import Bairro from './Bairro';
import Provincia from './Provincia';


@Entity("municipio")
class Municipio {
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

  @Column({
    type: "uuid",
    nullable: false,
  })
  provinciaId: string;
  @ManyToOne(() => Provincia, (provincia) => provincia, { eager: true })
  @JoinColumn({ name: 'provinciaId' })
  ProvinciaId: Provincia;

  @OneToMany(() => Bairro, (bairro) => bairro)
  Bairros: Bairro[];
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default Municipio;