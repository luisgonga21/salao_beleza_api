import { EntityRepository, Repository } from "typeorm";
import Usuario from "../app/models/Usuario";

@EntityRepository(Usuario)
class UsuarioRepository extends Repository <Usuario>{}
export default UsuarioRepository;