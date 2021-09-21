
import 'reflect-metadata'
import { Column, 
  CreateDateColumn, 
  Entity,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
//import Contacto from './Contacto';


@Entity("tipoContacto")
class TipoContacto {
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

  //@OneToMany(() => Contacto, (contacto) => contacto)
  //Contactos: Contacto[];
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default TipoContacto;