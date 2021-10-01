import { EntityRepository, Repository } from "typeorm";
import Ficheiro from "../app/models/Ficheiro";

@EntityRepository(Ficheiro)
class FicheiroRepository extends Repository <Ficheiro>{}
export default FicheiroRepository;

