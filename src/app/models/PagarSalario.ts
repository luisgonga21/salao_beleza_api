import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import TipoPagamento from "./TipoPagamento";
  
  @Entity("pagarSalario")
  class PagarSalario {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
      type:'float',
      nullable: false
    } )
    valorPago: Number;
    
    @Column({
      type:'float',
      nullable: false
    })
    valorFalta: Number;

    @Column({
        type:'varchar',
        nullable: true
    })
    numeroTransacao: string;
    
    @CreateDateColumn({
        type:'date',
        nullable: false
    })
    dataPagamento: Date;

    @Column({
      type: "uuid",
      nullable: false,
    })
    tipoPagamentoId: string;
    @ManyToOne(() => TipoPagamento, (tipoPagamento) => tipoPagamento, { eager: true })
    @JoinColumn({ name: 'tipoPagamentoId' })
    TipoPagamentoId: TipoPagamento;
  
  }
  
  export default PagarSalario;