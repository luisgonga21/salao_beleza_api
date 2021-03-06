import multer  from "multer";
import { Request, Response, Router } from "express";
import {
      TipoContacto_controller,
      TipoUsuario_controller,
      Provincia_controller,
      Municipio_controller,
      Bairro_controller,
      Endereco_controller,
      Cargo_controller,
      Servico_controller,
      Salao_controller,
      PagarSalario_controller,
      Agendamento_controller,
      Login_controller,
      Usuario_controller,
      TipoPagamento_controller,
      Permissao_controller,
      PermissaoTipoUsuario_controller,
      TipoFicheiro_controller,
      Ficheiro_controller,
      Contacto_controller,
      Sessao_controller
} from "./app/controllers/index";
import { multerconfig }  from "./config/multer";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
      return res.status(400).json({ message: "running well" });
});

const upload = multer(multerconfig);


// FICHEIROS LUÍS GONGA MENDES DONO DESSA API
routes.post("/ficheiro/:tipoFicheiroId", upload.single("file"),  Ficheiro_controller.store);
routes.get("/ficheiro", Ficheiro_controller.index);
routes.get("/ficheiro/:id", Ficheiro_controller.getOne);
routes.put("/ficheiro/:id", upload.single("file"), Ficheiro_controller.update);
routes.delete("/ficheiro/:id", Ficheiro_controller.delete);

// TIPO Contacto
routes.post("/tipocontacto", TipoContacto_controller.store);
routes.get("/tipocontacto", TipoContacto_controller.index);
routes.get("/tipocontacto/:id", TipoContacto_controller.getOne);
routes.put("/tipocontacto/:id", TipoContacto_controller.update);
routes.delete("/tipocontacto/:id", TipoContacto_controller.delete);


// TIPO USUARIO LUÍS GONGA MENDES DONO DESSA API
routes.post("/tipousuario", TipoUsuario_controller.store);
routes.get("/tipousuario", TipoUsuario_controller.index);
routes.get("/tipousuario/:id", TipoUsuario_controller.getOne);
routes.put("/tipousuario/:id", TipoUsuario_controller.update);
routes.delete("/tipousuario/:id", TipoUsuario_controller.delete);


// PROVINCIA LUÍS GONGA MENDES DONO DESSA API
routes.post("/provincia", Provincia_controller.store);
routes.get("/provincia", Provincia_controller.index);
routes.get("/provincia/:id", Provincia_controller.getOne);
routes.put("/provincia/:id", Provincia_controller.update);
routes.delete("/provincia/:id", Provincia_controller.delete);

// MUNICIPIO LUÍS GONGA MENDES DONO DESSA API
routes.post("/municipio", Municipio_controller.store);
routes.get("/municipio", Municipio_controller.index);
routes.get("/municipio/:id", Municipio_controller.getOne);
routes.put("/municipio/:id", Municipio_controller.update);
routes.delete("/municipio/:id", Municipio_controller.delete);

// BAIRRO LUÍS GONGA MENDES DONO DESSA API
routes.post("/bairro", Bairro_controller.store);
routes.get("/bairro", Bairro_controller.index);
routes.get("/bairro/:id", Bairro_controller.getOne);
routes.put("/bairro/:id", Bairro_controller.update);
routes.delete("/bairro/:id", Bairro_controller.delete);


// ENDERECO LUÍS GONGA MENDES DONO DESSA API
routes.post("/endereco", Endereco_controller.store);
routes.get("/endereco", Endereco_controller.index);
routes.get("/endereco/:id", Endereco_controller.getOne);
routes.put("/endereco/:id", Endereco_controller.update);
routes.delete("/endereco/:id", Endereco_controller.delete);


// Cargo LUÍS GONGA MENDES DONO DESSA API
routes.post("/cargo", Cargo_controller.store);
routes.get("/cargo", Cargo_controller.index);
routes.get("/cargo/:id", Cargo_controller.getOne);
routes.put("/cargo/:id", Cargo_controller.update);
routes.delete("/cargo/:id", Cargo_controller.delete);


// SERVIÇOS LUÍS GONGA MENDES DONO DESSA API
routes.post("/servico", Servico_controller.store);
routes.get("/servico", Servico_controller.index);
routes.get("/servico/:id", Servico_controller.getOne);
routes.put("/servico/:id", Servico_controller.update);
routes.delete("/servico/:id", Servico_controller.delete);


// SALÃO LUÍS GONGA MENDES DONO DESSA API
routes.post("/salao", Salao_controller.store);
routes.get("/salao", Salao_controller.index);
routes.get("/salao/:id", Salao_controller.getOne);
routes.put("/salao/:id", Salao_controller.update);
routes.delete("/salao/:id", Salao_controller.delete);


// PAGAMENTO DOS SALÁRIOS
routes.post("/pagarsalario", PagarSalario_controller.store);
routes.get("/pagarsalario", PagarSalario_controller.index);
routes.get("/pagarsalario/:id", PagarSalario_controller.getOne);
routes.put("/pagarsalario/:id", PagarSalario_controller.update);
routes.delete("/pagarsalario/:id", PagarSalario_controller.delete);


// AGENDAMENTO DE SERVIÇOS
routes.post("/agendamento", Agendamento_controller.store);
routes.get("/agendamentos", Agendamento_controller.index);
routes.get("/agendamento/:id", Agendamento_controller.getOne);
routes.put("/agendamento/:id", Agendamento_controller.update);
routes.delete("/agendamento/:id", Agendamento_controller.delete);


// LOGIN LUÍS GONGA MENDES DONO DESSA API
routes.post("/login", Login_controller.store);
routes.get("/login", Login_controller.index);
routes.put("/login/:id", Login_controller.update);


//SESSÃO LUÍS GONGA MENDES DONO DESSA API
routes.post("/sessao", Sessao_controller.store);

//USUARIO
routes.post("/usuario/:tipoUsuarioId", Usuario_controller.store);
routes.get("/usuario", Usuario_controller.index);
routes.get("/usuario/:id", Usuario_controller.getOne);
routes.put("/usuario/:id", Usuario_controller.update);
routes.delete("/usuario/:id", Usuario_controller.delete);



// TIPO PAGAMENTO LUÍS GONGA MENDES DONO DESSA API
routes.post("/tipoPagamento", TipoPagamento_controller.store);
routes.get("/tipoPagamento", TipoPagamento_controller.index);
routes.get("/tipoPagamento/:id", TipoPagamento_controller.getOne);
routes.put("/tipoPagamento/:id", TipoPagamento_controller.update);
routes.delete("/tipoPagamento/:id", TipoPagamento_controller.delete);


// Permissão LUÍS GONGA MENDES DONO DESSA API
routes.post("/permissao", Permissao_controller.store);
routes.get("/permissao", Permissao_controller.index);
routes.get("/permissao/:id", Permissao_controller.getOne);
routes.put("/permissao/:id", Permissao_controller.update);
routes.delete("/permissao/:id", Permissao_controller.delete);


// TIPO DE USURÁIO LUÍS GONGA MENDES DONO DESSA API
routes.post("/permissaoTipoUsuario", PermissaoTipoUsuario_controller.store);
routes.get("/permissaoTipoUsuario", PermissaoTipoUsuario_controller.index);
routes.get("/permissaoTipoUsuario/:id", PermissaoTipoUsuario_controller.getOne);
routes.put("/permissaoTipoUsuario/:id", PermissaoTipoUsuario_controller.update);
routes.delete("/permissaoTipoUsuario/:id", PermissaoTipoUsuario_controller.delete);


// TIPO DE FICHEIRO
routes.post("/tipoFicheiro", TipoFicheiro_controller.store);
routes.get("/tipoFicheiro", TipoFicheiro_controller.index);
routes.get("/tipoFicheiro/:id", TipoFicheiro_controller.getOne);
routes.put("/tipoFicheiro/:id", TipoFicheiro_controller.update);
routes.delete("/tipoFicheiro/:id", TipoFicheiro_controller.delete);


// CONTACTO LUÍS GONGA MENDES DONO DESSA API
routes.post("/contacto/:tipoContactoId", Contacto_controller.store);
routes.get("/contacto", Contacto_controller.index);
routes.get("/contacto/:id", Contacto_controller.getOne);
routes.put("/contacto/:id", Contacto_controller.update);
routes.delete("/contacto/:id", Contacto_controller.delete);


export default routes;

