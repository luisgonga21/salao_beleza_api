import { EntityRepository, Repository } from "typeorm";
import Agendamento from "../app/models/Agendamento";

@EntityRepository(Agendamento)
class AgendamentoRepository extends Repository<Agendamento> {}
export default AgendamentoRepository;