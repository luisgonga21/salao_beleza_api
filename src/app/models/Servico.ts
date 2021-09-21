import { Column, 
    CreateDateColumn, 
    Entity,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
  
  
  @Entity("servico")
  class Servico {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    })
    name: string;

    @Column({
      type:'int',
      nullable: false
    })
    preco: Number;
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Servico;