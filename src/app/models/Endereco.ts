import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import Municipio from "./Municipio";
import Provincia from "./Provincia";
  @Entity("endereco")
  class Endereco {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    })
    rua: string;

    @Column({
        type:'int',
        nullable: false
    })
    numeroCasa: Number;

    @Column({
      type: "uuid",
      nullable: false,
    })
    provinciaId: string;
    @ManyToOne(() => Provincia, (provincia) => provincia, { eager: true })
    @JoinColumn({ name: 'provinciaId' })
    ProvinciaId: Provincia;

    @Column({
      type: "uuid",
      nullable: false,
    })
    municipioId: string;
    @ManyToOne(() => Municipio, (municipio) => municipio, { eager: true })
    @JoinColumn({ name: 'municipioId' })
    MunicipioId: Municipio;
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Endereco;