
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
import TipoContacto from './TipoContacto';
import Usuario from './Usuario';


@Entity("contacto")
class Contacto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'varchar',
    nullable: false,
    unique: true,
  })
  description: string;

  @Column({
    type: "uuid",
    nullable: false,
  })
  tipoContactoId: string;
  @ManyToOne(() => TipoContacto, (tipoContacto) => tipoContacto, { eager: true })
  @JoinColumn({ name: 'tipoContactoId' })
  TipoContactoId: TipoContacto;

  @Column({
    type: "uuid",
    nullable: false,
  })
  usuarioId: string;
  @ManyToOne(() => Usuario, (usuario) => usuario,  { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  UsuarioId: Usuario;
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default Contacto;