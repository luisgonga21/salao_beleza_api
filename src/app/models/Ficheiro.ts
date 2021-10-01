import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import TipoFicheiro from "./TipoFicheiro";
   
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

    @Column({
      type: "uuid",
      nullable: false,
    })
    tipoFicheiroId: string;
    @ManyToOne(() => TipoFicheiro, (tipoFicheiro) => tipoFicheiro, { eager: true })
    @JoinColumn({ name: 'tipoFicheiroId' })
    TipoFicheiroId: TipoFicheiro;
      
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  export default Ficheiro;