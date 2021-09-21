import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeUpdate,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    Timestamp,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import bcrypt from 'bcrypt';
  
  @Entity('login')
  class Login {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
        type: "varchar",
        nullable: false,
    })
    password: string;
  
    @BeforeInsert()
    @BeforeUpdate()
    hasPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }
  
  export default Login;