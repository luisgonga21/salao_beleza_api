import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
  } from "typeorm";
  
  
  @Entity("tipoPagamento")
  class TipoPagamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'varchar',
      nullable: false
    })
    name: string;
  
  }
  
  export default TipoPagamento;