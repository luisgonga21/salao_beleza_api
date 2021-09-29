import { Column, 
    CreateDateColumn, 
    Entity,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
   

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
  
    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Usuario;
  