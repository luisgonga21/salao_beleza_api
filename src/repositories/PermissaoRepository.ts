import { EntityRepository, Repository } from "typeorm";
import Permissao from "../app/models/Permissao";

@EntityRepository(Permissao)
class PermissaoRepository extends Repository <Permissao>{}
export default PermissaoRepository;