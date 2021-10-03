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
import Endereco from "./Endereco";
import Municipio from "./Municipio";
  
  
  @Entity("bairro")
  class Bairro {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    } )
    name: string;

    @Column({
        type: "uuid",
        nullable: false,
    })
    municipioId: string;
    @ManyToOne(() => Municipio, (municipio) => municipio, { eager: true })
    @JoinColumn({ name: 'municipioId' })
    MunicipioId: Municipio;

    @OneToMany(() => Endereco, (endereco) => endereco)
    Enderecos: Endereco[];
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Bairro;