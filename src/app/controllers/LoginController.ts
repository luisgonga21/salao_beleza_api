import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import LoginRepository from '../../repositories/LoginRepository';


class LoginController {
  async index(req: Request, res: Response) {
    const loginRepository = getCustomRepository(LoginRepository);
    const login = await loginRepository.find();
    return res.status(200).json(login);
  }

  async store(req: Request, res: Response) {
    try {
      const loginRepository = getCustomRepository(LoginRepository);
      const { password } = req.body;
      const login = loginRepository.create({
          password,
      });
      await loginRepository.save(login);
      return res.status(200).json({ login });
    } catch (err) {
      console.log(err);
    }
  }
}

export default new LoginController();


