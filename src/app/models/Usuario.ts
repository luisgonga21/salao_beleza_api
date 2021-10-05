import { Column, 
    CreateDateColumn, 
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn, 
    Timestamp, 
    UpdateDateColumn 
  } from "typeorm";
import Agendamento from "./Agendamento";
import Cargo from "./Cargo";
import Endereco from "./Endereco";
import Login from "./Login";
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

    @Column({
      type: "uuid",
      nullable: false,
    })
    cargoId: string;
    @ManyToOne(() => Cargo, (cargo) => cargo, { eager: true })
    @JoinColumn({ name: 'cargoId' })
    CargoId: Cargo;

    @Column({
      type: "uuid",
      nullable: false,
    })
    enderecoId: string;
    @ManyToOne(() => Endereco, (endereco) => endereco, { eager: true })
    @JoinColumn({ name: 'enderecoId' })
    EnderecoId: Endereco;

    @OneToOne(() => Login, (login) => login)
    Login: Login[];

    @OneToMany(() => Agendamento, (agendamento) => agendamento)
    Agendamentos: Agendamento[];

    @OneToMany(() => Agendamento, (AgendamentoCliente) => AgendamentoCliente)
    AgendamentoCliente: Agendamento[];

    @CreateDateColumn()
    createdAt: Timestamp;
  
    @UpdateDateColumn()
    updatedAt: Timestamp;
  
  }
  
  export default Usuario;
  