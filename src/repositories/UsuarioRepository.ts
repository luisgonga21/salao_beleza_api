import { EntityRepository, Repository } from "typeorm";
import Cargo from "../app/models/TipoContacto";

@EntityRepository(Cargo)
class CargoRepository extends Repository <Cargo>{}
export default CargoRepository;