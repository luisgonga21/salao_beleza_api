import { Column, 
    CreateDateColumn, 
    Entity,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
  
  
  @Entity("cargo")
  class Cargo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    })
    name: string;

    @Column({
      type:'float',
      nullable: false
    })
    salario: Number;
    
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Cargo;