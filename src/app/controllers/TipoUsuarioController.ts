import 'reflect-metadata' 
import { Request, Response } from 'express'
import {getCustomRepository} from 'typeorm'
import TipoUsuarioRepository from '../../repositories/TipoUsuarioRepository';
import PermissaoRepository from '../../repositories/PermissaoRepository';
import * as Yup from "yup";


class TipoUsuarioController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const permissaoRepository = getCustomRepository(PermissaoRepository)
      const  tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const { name ,description, permissao } = req.body;
      const existTipoUsuario = await  tipoUsuarioRepository.findOne({ name })
      if ( existTipoUsuario) {
        return res.status(404).json({message:'Tipo de usuário já existente!'})
      }
      const existePermissao = await permissaoRepository.findByIds(permissao)
      const TipoUsuario =  tipoUsuarioRepository.create({
        name,
        description,
        permissao: existePermissao,
      });
      await tipoUsuarioRepository.save(TipoUsuario)
      return res.status(201).json(TipoUsuario)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const existTipoUsuario = await tipoUsuarioRepository.find()
      if (existTipoUsuario) {
        const result = existTipoUsuario
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Tipo de usuário não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
    const existTipoUsuario = await tipoUsuarioRepository.findOne({ id })
    if (existTipoUsuario) {
      const result = existTipoUsuario;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Tipo de usuário não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name, description } = req.body
      const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const existTipoUsuario = await tipoUsuarioRepository.findOne({id})
      if (existTipoUsuario) {
          const result= await  tipoUsuarioRepository.update({
            id
          },
          {
            name, 
            description
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Tipo de usuário não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const existTipoUsuario = await tipoUsuarioRepository.findOne({ id })
      if (existTipoUsuario) {
          const result= await  tipoUsuarioRepository.delete(id)
          return res.status(200).json({ message: "Tipo de usuário eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Tipo de usuário não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new TipoUsuarioController;