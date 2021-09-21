import { EntityRepository, Repository } from "typeorm";
import pagarSalario from "../app/models/PagarSalario";

@EntityRepository(pagarSalario)
class pagarSalarioRepository extends Repository <pagarSalario>{}
export default pagarSalarioRepository;