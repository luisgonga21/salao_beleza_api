import 'reflect-metadata' 
import { Request, Response } from 'express'
import {getCustomRepository} from 'typeorm'
import UsuarioRepository from '../../repositories/UsuarioRepository';
import * as Yup from "yup";
import TipoUsuarioRepository from '../../repositories/TipoUsuarioRepository';


class UsuarioController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        numeroBi: Yup.string().required(),
        dataNascimento: Yup.string().required(),
        genero: Yup.string().required(),
        estadoCivil: Yup.string(),
        tipoUsuarioId: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const  usuarioRepository = getCustomRepository(UsuarioRepository)
      const { tipoUsuarioId } = req.params;
      const { name , dataNascimento, numeroBi, genero, estadoCivil } = req.body;
      const existUsuario = await  usuarioRepository.findOne({ numeroBi })
      const ExisteTipoUsuario = await tipoUsuarioRepository.findOne({where: {id: tipoUsuarioId }})
      if ( existUsuario) {
        return res.status(404).json({message:'usuário já existente!'})
      }
      if (!ExisteTipoUsuario) {
        return res.status(404).json({ message: 'Tipo Usuario não encontrado!!' })
      }
      if(ExisteTipoUsuario.name === "Funcionario"){
        const Usuario =  usuarioRepository.create({
          name,
          numeroBi,
          dataNascimento,
          estadoCivil,
          genero,
          tipoUsuarioId
        });
        await usuarioRepository.save(Usuario)
        return res.status(201).json(Usuario)
      }
      
      if(ExisteTipoUsuario.name === "Cliente"){
        const Usuario =  usuarioRepository.create({
          name,
          numeroBi,
          dataNascimento,
          genero,
          tipoUsuarioId
        });
        await usuarioRepository.save(Usuario)
        return res.status(201).json(Usuario)
      }
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const existUsuario = await usuarioRepository.find()
      if (existUsuario) {
        const result = existUsuario
        return res.status(200).json(result)
}
      return res.status(402).json({ message: "usuário não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const usuarioRepository = getCustomRepository(UsuarioRepository)
    const existUsuario = await usuarioRepository.findOne({ id })
    if (existUsuario) {
      const result = existUsuario;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "usuário não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        numeroBi: Yup.string().required(),
        dataNascimento: Yup.string().required(),
        genero: Yup.string().required(),
        estadoCivil: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name, numeroBi, dataNascimento, genero, estadoCivil } = req.body
      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const existUsuario = await usuarioRepository.findOne({id})
      if (existUsuario) {
          const result= await  usuarioRepository.update({
            id
          },
          {
            name, 
            dataNascimento,
            numeroBi,
            genero,
            estadoCivil
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "usuário não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const existUsuario = await usuarioRepository.findOne({ id })
      if (existUsuario) {
          const result= await  usuarioRepository.delete(id)
          return res.status(200).json({ message: "usuário eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "usuário não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new UsuarioController;