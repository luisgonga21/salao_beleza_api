import { EntityRepository, Repository } from "typeorm";
import PermissaoTipoUsuario from "../app/models/PermissaoTipoUsuario";

@EntityRepository(PermissaoTipoUsuario)
class PermissaoTipoUsuarioRepository extends Repository <PermissaoTipoUsuario>{}
export default PermissaoTipoUsuarioRepository;

