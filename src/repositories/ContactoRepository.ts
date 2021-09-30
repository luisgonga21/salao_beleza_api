import { EntityRepository, Repository } from "typeorm";
import Contacto from "../app/models/Contacto";

@EntityRepository(Contacto)
class ContactoRepository extends Repository <Contacto>{}
export default ContactoRepository;