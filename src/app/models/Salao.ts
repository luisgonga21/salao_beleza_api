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
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Salao;