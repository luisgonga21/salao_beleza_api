import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
   
  @Entity('ficheiro')
  class Ficheiro {
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
    })
    path: string;
      
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  export default Ficheiro;