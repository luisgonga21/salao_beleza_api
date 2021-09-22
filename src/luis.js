import multer  from "multer";
import { Request, Response, Router } from "express";
import {
      Address_controller,
      TypeRegistration_controller,
      Period_controller,
      AcademicYear_controller,
      Schooling_controller,
      SystemClass_controller,
      School_controller,
      TypeFile_controller,
      File_controller,
      TypeSchool_controller,
      ClasseEscola_controller,
      CursoSistema_controller,
      CursoEscola_controller,
      TipoContacto_controller,
      TipoUsuario_controller,
      Contacto_controller,
      Permissao_controller,
      Banco_controller,
      Meses_controller,
      DadosGerais_controller,
      DadosGeraisEscola_controller,
      Login_controller,
      Session_controller,
      Usuario_controller,
} from "./app/controllers/index";
import { multerconfig }  from "./config/multer";
import InscricaoController from "./app/controllers/InscricaoController";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
      return res.status(400).json({ message: "running well" });
});

const upload = multer(multerconfig);


// TIPO DE FICHEIROS
routes.post("/typeFile", TypeFile_controller.store);
routes.get("/typeFile", TypeFile_controller.index);
routes.get("/typeFile/:id", TypeFile_controller.getOne);
routes.put("/typeFile/:id", TypeFile_controller.update);
routes.delete("/typeFile/:id", TypeFile_controller.delete);


// FICHEIROS
routes.post("/file/:schoolId/:typeId", upload.single("file"),  File_controller.store);
routes.get("/file", File_controller.index);
routes.get("/file/:id", File_controller.getOne);
routes.put("/file/:id", upload.single("file"), File_controller.update);
routes.delete("/file/:id", File_controller.delete);


// ENDEREÇO
routes.get("/address", Address_controller.index);
routes.post("/address", Address_controller.store);
routes.get("/address/:id", Address_controller.getOne);
routes.put("/address/:id", Address_controller.update);
routes.delete("/address/:id", Address_controller.delete);

// TYPEREGISTRATION
routes.get("/typeRegistration", TypeRegistration_controller.index);
routes.post("/typeRegistration", TypeRegistration_controller.store);
routes.get("/typeRegistration/:id", TypeRegistration_controller.getOne);
routes.put("/typeRegistration/:id", TypeRegistration_controller.update);
routes.delete("/typeRegistration/:id", TypeRegistration_controller.delete);

// TRIMESTRES
routes.get("/period", Period_controller.index);
routes.post("/period", Period_controller.store);
routes.get("/period/:id", Period_controller.getOne);
routes.put("/period/:id", Period_controller.update);
routes.delete("/period/:id", Period_controller.delete);

// ANO ACADEMICO
routes.get("/academicYear", AcademicYear_controller.index);
routes.post("/academicYear", AcademicYear_controller.store);
routes.get("/academicYear/:id", AcademicYear_controller.getOne);
routes.put("/academicYear/:id", AcademicYear_controller.update);
routes.delete("/academicYear/:id", AcademicYear_controller.delete);


// NIVEIS DE ENSINO
routes.post("/schooling",Schooling_controller.store);
routes.get("/schooling",Schooling_controller.index);
routes.get("/schooling/:id",Schooling_controller.getOne);
routes.put("/schooling/:id",Schooling_controller.update);
routes.delete("/schooling/:id",Schooling_controller.delete);


// TIPO DE ESCOLA
routes.post("/typeSchool", TypeSchool_controller.store);
routes.get("/typeSchool", TypeSchool_controller.index);
routes.get("/typeSchool/:id", TypeSchool_controller.getOne);
routes.put("/typeSchool/:id", TypeSchool_controller.update);
routes.delete("/typeSchool/:id", TypeSchool_controller.delete);


// ESCOLA
routes.get("/school", School_controller.index);
routes.post("/school/:addressId", School_controller.store);
routes.get("/school/:id", School_controller.getOne);
routes.put("/school/:id", School_controller.update);
routes.delete("/school/:id", School_controller.delete);


// CLASSES DO SISTEMA
routes.post("/systemClass/:schoolingId", SystemClass_controller.store);
routes.get("/systemClass", SystemClass_controller.index);
routes.get("/systemClass/:id", SystemClass_controller.getOne);
routes.put("/systemClass/:id", SystemClass_controller.update);
routes.delete("/systemClass/:id", SystemClass_controller.delete);


// CLASSES DAS ESCOLAS
routes.post("/classEscola", ClasseEscola_controller.store);
routes.get("/classEscola", ClasseEscola_controller.index);
routes.get("/classEscola/:escolaId", ClasseEscola_controller.getOne);
routes.put("/classEscola/:id", ClasseEscola_controller.update);
routes.delete("/classEscola/:id", ClasseEscola_controller.delete);


// CURSOS DO SISTEMA
routes.post("/cursoSistema", CursoSistema_controller.store);
routes.get("/cursoSistema", CursoSistema_controller.index);
routes.get("/cursoSistema/:id", CursoSistema_controller.getOne);
routes.put("/cursoSistema/:id", CursoSistema_controller.update);
routes.delete("/cursoSistema/:id", CursoSistema_controller.delete);


// CURSO DA ESCOLA
routes.post("/cursoEscola", CursoEscola_controller.store);
routes.get("/cursoEscola", CursoEscola_controller.index);
routes.get("/cursoEscola/:id", CursoEscola_controller.getOne);
routes.put("/cursoEscola/:id", CursoEscola_controller.update);
routes.delete("/cursoEscola/:id", CursoEscola_controller.delete);

// TIPO DE CONTACTO
routes.post("/tipocontacto", TipoContacto_controller.store);
routes.get("/tipocontacto", TipoContacto_controller.index);
routes.get("/tipocontacto/:id", TipoContacto_controller.getOne);
routes.put("/tipocontacto/:id", TipoContacto_controller.update);
routes.delete("/tipocontacto/:id", TipoContacto_controller.delete);

// CONTACTO
routes.post("/contacto", Contacto_controller.store);
routes.get("/contacto", Contacto_controller.index);
routes.get("/contacto/:id", Contacto_controller.getOne);
routes.put("/contacto/:id", Contacto_controller.update);
routes.delete("/contacto/:id", Contacto_controller.delete);

// PERMISSÃO
routes.post("/permissao", Permissao_controller.store);
routes.get("/permissao", Permissao_controller.index);
routes.get("/permissao/:id", Permissao_controller.getOne);
routes.put("/permissao/:id", Permissao_controller.update);
routes.delete("/permissao/:id", Permissao_controller.delete);




// MESES
routes.post("/meses", Meses_controller.store);
routes.get("/meses", Meses_controller.index);
routes.get("/meses/:id", Meses_controller.getOne);
routes.put("/meses/:id", Meses_controller.update);
routes.delete("/meses/:id", Meses_controller.delete);

// DADOS GERAIS
routes.post("/dadosgerais", DadosGerais_controller.store);
routes.get("/dadosgerais", DadosGerais_controller.index);
routes.get("/dadosgerais/:id", DadosGerais_controller.getOne);
routes.put("/dadosgerais/:id", DadosGerais_controller.update);
routes.delete("/dadosgerais/:id", DadosGerais_controller.delete);

// DADOS GERAIS DA ESCOLA
routes.post("/dadosgeraisescola", DadosGeraisEscola_controller.store);
routes.get("/dadosgeraisescola", DadosGeraisEscola_controller.index);
routes.get("/dadosgeraisescola/:id", DadosGeraisEscola_controller.getOne);
routes.put("/dadosgeraisescola/:id", DadosGeraisEscola_controller.update);
routes.delete("/dadosgeraisescola/:id", DadosGeraisEscola_controller.delete);

// LOGIN
routes.get("/login", Login_controller.index);
routes.post("/login", Login_controller.store);

// SESSION
routes.post("/session", Session_controller.store);

// USUARIO
routes.post("/usuario/:tipoUsuarioId", Usuario_controller.store);
routes.get("/usuario", Usuario_controller.index);
routes.get("/usuario/:id", Usuario_controller.getOne);
routes.put("/usuario/:id", Usuario_controller.update);
routes.delete("/usuario/:id", Usuario_controller.delete);

// INSCRIÇÃO
routes.post("/inscricao", InscricaoController.store);
routes.get("/inscricao", InscricaoController.index);
routes.get("/inscricao/:id", InscricaoController.getOne);
routes.put("/inscricao/:id", InscricaoController.update);
routes.delete("/inscricao/:id", InscricaoController.delete);

export default routes;



import { Column, 
  CreateDateColumn, 
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany, 
  PrimaryGeneratedColumn, 
  Timestamp, 
  UpdateDateColumn 
} from "typeorm";
 

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
      type:'date',
      nullable: false
  })
  dataNascimento: Date;

  @Column('enum')
  genero: "Masculino" | "Femenino";

  @Column({
      type:'enum',
      nullable: true
  })
  estadoCivil: "Casado" | "Solteiro" | "Viúvo" | "Divorsiado";
  
  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

}

export default Usuario;


    import { Column, 
      CreateDateColumn, 
      Entity,
      JoinTable,
      ManyToMany,
      OneToMany, 
      PrimaryGeneratedColumn, 
      Timestamp, 
      UpdateDateColumn 
    } from "typeorm";
     
    @Entity("turno")
    class Turno {
      @PrimaryGeneratedColumn('uuid')
      id: string;
      
      @Column({
        type:'varchar',
        nullable: false
      } )
      name: string;
      
      @Column({
        type:'varchar',
        nullable: true
      })
      horaInicio: string;
      
      @CreateDateColumn()
      createdAt: Timestamp;
    
      @UpdateDateColumn()
      updatedAt: Timestamp;
    
    }
    
    export default Turno;