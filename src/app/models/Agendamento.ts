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
    
    @Column({
        type:'date',
        nullable: false
    })
    dataAgendamento: Date;

    @Column({
        type:'date',
        nullable: true
    })
    cancelamento: Date;

    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Agendamento;