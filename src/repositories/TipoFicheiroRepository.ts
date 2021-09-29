import { EntityRepository, Repository } from "typeorm";
import TipoFicheiro from "../app/models/TipoFicheiro";

@EntityRepository(TipoFicheiro)
class TipoFicheiroRepository extends Repository <TipoFicheiro>{}
export default TipoFicheiroRepository;
