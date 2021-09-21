import { EntityRepository, Repository } from "typeorm";
import Servico from "../app/models/Servico";

@EntityRepository(Servico)
class ServicoRepository extends Repository <Servico>{}
export default ServicoRepository;