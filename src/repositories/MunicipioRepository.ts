import { EntityRepository, Repository } from "typeorm"
import Municipio from "../app/models/Municipio"

@EntityRepository(Municipio)
class MunicipioRepository extends Repository<Municipio> {}
export default MunicipioRepository;