import { Column, 
    CreateDateColumn, 
    Entity,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
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
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Endereco;