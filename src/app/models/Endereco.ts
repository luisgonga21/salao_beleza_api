import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import Bairro from "./Bairro";
import Municipio from "./Municipio";
import Provincia from "./Provincia";
import Salao from "./Salao";
import Usuario from "./Usuario";
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

    @Column({
      type: "uuid",
      nullable: false,
    })
    bairroId: string;
    @ManyToOne(() => Bairro, (bairro) => bairro, { eager: true })
    @JoinColumn({ name: 'bairroId' })
    BairroId: Bairro;

    @OneToMany(() => Usuario, (usuario) => usuario)
    Usuarios: Usuario[];

    @OneToOne(() => Salao, (salao) => salao)
    Saloes: Salao[];
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Endereco;