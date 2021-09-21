import { EntityRepository, Repository } from "typeorm";
import TipoUsuario from "../app/models/TipoUsuario";

@EntityRepository(TipoUsuario)
class TipoUsuarioRepository extends Repository <TipoUsuario>{}
export default TipoUsuarioRepository;