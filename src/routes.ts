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
      Login_controller
} from "./app/controllers/index";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
      return res.status(400).json({ message: "running well" });
});

// TIPO Contacto
routes.post("/tipocontacto", TipoContacto_controller.store);
routes.get("/tipocontacto", TipoContacto_controller.index);
routes.get("/tipocontacto/:id", TipoContacto_controller.getOne);
routes.put("/tipocontacto/:id", TipoContacto_controller.update);
routes.delete("/tipocontacto/:id", TipoContacto_controller.delete);


// TIPO USUARIO
routes.post("/tipousuario", TipoUsuario_controller.store);
routes.get("/tipousuario", TipoUsuario_controller.index);
routes.get("/tipousuario/:id", TipoUsuario_controller.getOne);
routes.put("/tipousuario/:id", TipoUsuario_controller.update);
routes.delete("/tipousuario/:id", TipoUsuario_controller.delete);


// PROVINCIA
routes.post("/provincia", Provincia_controller.store);
routes.get("/provincia", Provincia_controller.index);
routes.get("/provincia/:id", Provincia_controller.getOne);
routes.put("/provincia/:id", Provincia_controller.update);
routes.delete("/provincia/:id", Provincia_controller.delete);

// MUNICIPIO
routes.post("/municipio", Municipio_controller.store);
routes.get("/municipio", Municipio_controller.index);
routes.get("/municipio/:id", Municipio_controller.getOne);
routes.put("/municipio/:id", Municipio_controller.update);
routes.delete("/municipio/:id", Municipio_controller.delete);

// BAIRRO
routes.post("/bairro", Bairro_controller.store);
routes.get("/bairro", Bairro_controller.index);
routes.get("/bairro/:id", Bairro_controller.getOne);
routes.put("/bairro/:id", Bairro_controller.update);
routes.delete("/bairro/:id", Bairro_controller.delete);


// ENDERECO
routes.post("/endereco", Endereco_controller.store);
routes.get("/endereco", Endereco_controller.index);
routes.get("/endereco/:id", Endereco_controller.getOne);
routes.put("/endereco/:id", Endereco_controller.update);
routes.delete("/endereco/:id", Endereco_controller.delete);


// Cargo
routes.post("/cargo", Cargo_controller.store);
routes.get("/cargo", Cargo_controller.index);
routes.get("/cargo/:id", Cargo_controller.getOne);
routes.put("/cargo/:id", Cargo_controller.update);
routes.delete("/cargo/:id", Cargo_controller.delete);


// SERVIÇOS
routes.post("/servico", Servico_controller.store);
routes.get("/servico", Servico_controller.index);
routes.get("/servico/:id", Servico_controller.getOne);
routes.put("/servico/:id", Servico_controller.update);
routes.delete("/servico/:id", Servico_controller.delete);


// SALÃO
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
routes.get("/agendamento", Agendamento_controller.index);
routes.get("/agendamento/:id", Agendamento_controller.getOne);
routes.put("/agendamento/:id", Agendamento_controller.update);
routes.delete("/agendamento/:id", Agendamento_controller.delete);


// LOGIN
routes.post("/login", Login_controller.store);
routes.get("/login", Login_controller.index);


export default routes;

