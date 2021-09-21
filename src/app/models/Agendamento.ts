import { Column, 
    CreateDateColumn, 
    Entity,
    OneToMany, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
  
  @Entity("agendamento")
  class Agendamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @CreateDateColumn({
        type:'date',
        nullable: false
    })
    dataAgendamento: Date;

    @CreateDateColumn({
        type:'date',
        nullable: true
    })
    cancelamento: Date;
  
  }
  
  export default Agendamento;