import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import TipoUsuario from "./TipoUsuario";
   

  export enum Genero {
    MASCULINO = "Masculino",
    FEMENINO = "Feminino",
    OUTRO = "",
  }

  export enum EstadoCivil {
    CASADO = "Casado",
    SOLTEIRO = "Solteiro",
    OUTRO = "",
  }
  
  @Entity("usuario")
  class Usuario {
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
        unique: true
    })
    numeroBi: string;

    @Column({
        type: "enum",
        nullable: false,
        enum: Genero,
    })
    genero: Genero;

    @Column({
        type: "enum",
        nullable: true,
        enum: EstadoCivil,
    })
    estadoCivil: EstadoCivil;
  
    @Column({
        type:'date',
        nullable: false
    })
    dataNascimento: Date;

    @Column({
      type: "uuid",
      nullable: false,
    })
    tipoUsuarioId: string;
    @ManyToOne(() => TipoUsuario, (tipousuario) => tipousuario, { eager: true })
    @JoinColumn({ name: 'tipoUsuarioId' })
    TipoUsuarioId: TipoUsuario;
  
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Usuario;
  