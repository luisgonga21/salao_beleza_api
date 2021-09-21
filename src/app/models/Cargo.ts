import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
  } from "typeorm";
  
  @Entity("cargo")
  class Cargo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    } )
    name: string;

    @Column({
        type:'int',
        nullable: false
    })
    salario: Number;
  
  }
  
  export default Cargo;