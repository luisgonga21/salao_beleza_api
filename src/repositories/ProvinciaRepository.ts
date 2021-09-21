import { EntityRepository, Repository } from "typeorm";
import Provincia from "../app/models/Provincia";

@EntityRepository(Provincia)
class ProvinciaRepository extends Repository <Provincia>{}
export default ProvinciaRepository;