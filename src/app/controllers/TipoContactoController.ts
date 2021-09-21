import 'reflect-metadata' 
import { Request, Response } from 'express'
import {getCustomRepository} from 'typeorm'
import TipoContactoRepository from '../../repositories/TipoContactoRepository';
import * as Yup from "yup";


class TipoContactoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  tipoContactoRepository = getCustomRepository(TipoContactoRepository)
      const { name, description } = req.body;
      const existTipoContacto = await  tipoContactoRepository.findOne({ name })
      if ( existTipoContacto) {
        return res.status(404).json({message:'Tipo de contacto já existente!'})
      }
      const TipoContacto =  tipoContactoRepository.create({
        name,
        description,
      });
      await tipoContactoRepository.save(TipoContacto)
      return res.status(201).json(TipoContacto)
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async index(req: Request, res: Response) {
    try {
      const tipoContactoRepository = getCustomRepository(TipoContactoRepository)
      const existTipoContacto = await tipoContactoRepository.find()
      if (existTipoContacto) {
        const result = existTipoContacto
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Tipo de Contacto não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const tipoContactoRepository = getCustomRepository(TipoContactoRepository)
    const existTipoContacto = await tipoContactoRepository.findOne({ id })
    if (existTipoContacto) {
      const result = existTipoContacto;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Tipo Contacto não encontrado!" })
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
      const tipoContactoRepository = getCustomRepository(TipoContactoRepository)
      const existTipoContacto = await tipoContactoRepository.findOne({id})
      if (existTipoContacto) {
          const result= await  tipoContactoRepository.update({
            id
          },
          {
            name, 
            description
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Tipo de Contacto não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const tipoContactoRepository = getCustomRepository(TipoContactoRepository)
      const existTipoContacto = await tipoContactoRepository.findOne({ id })
      if (existTipoContacto) {
          const result= await  tipoContactoRepository.delete(id)
          return res.status(200).json({ message: "Tipo de Contacto eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Tipo de contacto não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new TipoContactoController;