import { EntityRepository, Repository } from "typeorm"
import Login from "../app/models/Login"

@EntityRepository(Login)
class LoginRepository extends Repository<Login> {}
export default LoginRepository;