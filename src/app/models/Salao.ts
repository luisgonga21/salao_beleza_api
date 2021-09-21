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
        type:'varchar',
        nullable: false,
        unique: true
    })
    nif: string;
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Salao;