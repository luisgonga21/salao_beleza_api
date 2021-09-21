import { EntityRepository, Repository } from "typeorm";
import TipoContacto from "../app/models/TipoContacto";

@EntityRepository(TipoContacto)
class TipoContactoRepository extends Repository <TipoContacto>{}
export default TipoContactoRepository;