import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    ManyToOne, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
  import Usuario from "./Usuario"
  
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

    @Column({
      type: "uuid",
      nullable: false,
    })
    funcionarioId: string;
    @ManyToOne(() => Usuario, (funcionario) => funcionario, { eager: true })
    @JoinColumn({ name: 'funcionarioId' })
    FuncionarioId: Usuario;

    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Agendamento;