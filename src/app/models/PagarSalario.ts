import { Column, 
    CreateDateColumn, 
    Entity,
    OneToMany, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
  
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
  
  }
  
  export default PagarSalario;