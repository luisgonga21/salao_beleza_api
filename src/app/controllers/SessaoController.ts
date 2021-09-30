import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authData from '../../config/authConfig';
import LoginRepository from '../../repositories/LoginRepository';
import ContactoRepository from '../../repositories/ContactoRepository';
import UsuarioRepository from '../../repositories/UsuarioRepository';


class SessaoController {
  async store(req: Request, res: Response) {
    const loginRepository = getCustomRepository(LoginRepository);
    const contactoRepository = getCustomRepository(ContactoRepository);
    const usuarioRepository = getCustomRepository(UsuarioRepository);
    const { contacto, password } = req.body;
    const contactoExists = await contactoRepository.findOne({
      where: { description: contacto },
    });
    if (!contactoExists) {
      return res.status(400).json({ error: 'Login ou senha inválido1!' });
    }
    const usuario = await usuarioRepository.findOne({
      where: { id: contactoExists.usuarioId },
    });

    //const typeentity = await typeentityRepository.findOne({
    //  where: { id: entity?.typeentityId },
    //});

    //if (typeentity?.description.toLocaleLowerCase() === 'salão') {
    //  return res.status(401).json({ errror: 'Login não autorizado!' });
    //}
    const login = await loginRepository.findOne({
      where: { usuarioId: contactoExists.usuarioId },
    });
    if(!login) {
      return res.status(400).json({ error: 'Login ou senha inválido2!' });
    }
    const isValidPassword = bcrypt.compareSync(password, login.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Login ou senha inválido3!' });
    }

    const token = jwt.sign(
      { session: { usuarioId: login } },
      authData.key,
     {
        expiresIn: authData.expiresIn,
      }
    );

    return res.status(200).json(    {
      login,
      token,
    });
  }
}

export default new SessaoController();
