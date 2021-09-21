import { EntityRepository, Repository } from "typeorm";
import Endereco from "../app/models/Endereco";

@EntityRepository(Endereco)
class EnderecoRepository extends Repository <Endereco>{}
export default EnderecoRepository;