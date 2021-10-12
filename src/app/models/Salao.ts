import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import Endereco from "./Endereco";
import Ficheiro from "./Ficheiro"
   
  @Entity("salao")
  class Salao {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    } )
    name: string;

    @Column({
        type:'int',
        nullable: false,
        unique: true
    })
    nif: number;

    @Column({
        type:'int',
        nullable: false,
        unique: true
    })
    telefone1: number;

    @Column({
        type:'int',
        nullable: false,
        unique: true
    })
    telefone2: number;

    @Column({
        type:'varchar',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type:'int',
        nullable: false,
    })
    quantidadeFuncionario: number;

    @Column({
        type: "uuid",
        nullable: false,
    })
    enderecoId: string;
    @ManyToOne(() => Endereco, (endereco) => endereco, { eager: true })
    @JoinColumn({ name: 'enderecoId' })
    EnderecoId: Endereco;

    @Column({
        type: "uuid",
        nullable: false,
    })
    logotipoId: string;
    @OneToOne(() => Ficheiro, (ficheiro) => ficheiro, { eager: true })
    @JoinColumn({ name: 'logotipoId' })
    LogotipoId: Ficheiro;
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Salao;