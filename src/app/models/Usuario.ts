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
   

  @Entity("usuario")
  class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    } )
    name: string;

    @Column({
        type:'varchar',
        nullable: false,
        unique: true
    })
    numeroBi: string;

    @Column({
        type:'date',
        nullable: false
    })
    dataNascimento: Date;
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Usuario;