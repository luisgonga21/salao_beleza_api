import { EntityRepository, Repository } from "typeorm";
import TipoPagamento from "../app/models/TipoPagamento";

@EntityRepository(TipoPagamento)
class TipoPagamentoRepository extends Repository <TipoPagamento>{}
export default TipoPagamentoRepository;
