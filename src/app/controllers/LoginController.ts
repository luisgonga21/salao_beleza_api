import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import LoginRepository from '../../repositories/LoginRepository';
import ContactoRepository from '../../repositories/ContactoRepository';
import UsuarioRepository from '../../repositories/UsuarioRepository';
import * as Yup from "yup";

class LoginController {
  async index(req: Request, res: Response) {
    const loginRepository = getCustomRepository(LoginRepository);
    const login = await loginRepository.find();
    return res.status(200).json(login);
  }


  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      contactoId: Yup.string()
    });
    if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
    };
    try {
      const loginRepository = getCustomRepository(LoginRepository);
      const contactoRepository = getCustomRepository(ContactoRepository);
      const { password, contact } = req.body;
      const contacto = await contactoRepository.findOne({
        where: { description: contact,
        },
      });
      if (!contacto) {
        return res.status(404).json({ error: 'Contacto não encontrado!' });
      }
      const contactIdExist = await loginRepository.findOne({
        where: { contactoId: contacto.id },
      });
      if (contactIdExist) {
        return res.status(400).json({ error: 'Contacto já existente!!' });
      }
      const contactoId = await contacto.id;
      const { usuarioId }  = await contacto;
      const login = loginRepository.create({
          password,
          usuarioId,
          contactoId,
      });
      await loginRepository.save(login);
      return res.status(200).json({ login });
    } catch (err) {
      return res.status(404).json("error -->!"+err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        password: Yup.string().required(),
        usuarioId: Yup.string(),
        contactoId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { password } = req.body
      const loginRepository = getCustomRepository(LoginRepository)
      const login = await loginRepository.findOne( id )
      const updateOndeLogin = 1
      const Login= await  loginRepository.update({id},{ password })
      if(Login.affected === updateOndeLogin) {
        const loginUpdate = await loginRepository.findOne({id})
        return res.status(200).json({login, loginUpdate})
      }
      return res.status(404).json({ message: "Login não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };
}

export default new LoginController();


