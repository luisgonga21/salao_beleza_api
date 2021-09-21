import { EntityRepository, Repository } from "typeorm";
import Bairro from "../app/models/Bairro";

@EntityRepository(Bairro)
class BairroRepository extends Repository<Bairro> {}
export default BairroRepository;