import { EntityRepository, Repository } from "typeorm";
import Salao from "../app/models/Salao";

@EntityRepository(Salao)
class SalaoRepository extends Repository <Salao>{}
export default SalaoRepository;