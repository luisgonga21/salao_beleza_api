import 'reflect-metadata' 
import { Request, Response } from 'express'
import {getCustomRepository} from 'typeorm'
import ContactoRepository from '../../repositories/ContactoRepository';
import TipoContactoRepository from '../../repositories/TipoContactoRepository';
import * as Yup from "yup";
import UsuarioRepository from '../../repositories/UsuarioRepository';


class ContactoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string().required(),
        usuarioId: Yup.string(),
        tipoContactoId: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  contactoRepository = getCustomRepository(ContactoRepository)
      const  tipoContactoRepository = getCustomRepository(TipoContactoRepository)
      const  usuarioRepository = getCustomRepository(UsuarioRepository)
      const { tipoContactoId } = req.params
      const { description, usuarioId } = req.body;
      const existUsuario = await  usuarioRepository.findByIds(usuarioId)
      const existTipoContacto = await  tipoContactoRepository.findOne({where: {id: tipoContactoId}})
      const existContacto = await  contactoRepository.findOne({ description })
      if (!existTipoContacto) {
        return res.status(404).json({message:'Tipo de Contacto não existe!'})
      }
      if (!existUsuario) {
        return res.status(404).json({message:'Usuario não existente!'})
      }
      if (existContacto) {
        return res.status(404).json({message:'Contacto já existente!'})
      }
      const Contacto =  contactoRepository.create({
        description,
        tipoContactoId,
        usuarioId,
      });
      await contactoRepository.save(Contacto)
      return res.status(201).json(Contacto)
    }catch (error) {
      return res.status(404).json("error ->!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const contactoRepository = getCustomRepository(ContactoRepository)
      const existContacto = await contactoRepository.find()
      if (existContacto) {
        const result = existContacto
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Contacto não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const contactoRepository = getCustomRepository(ContactoRepository)
    const existContacto = await contactoRepository.findOne({ id })
    if (existContacto) {
      const result = existContacto;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Contacto não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { description } = req.body
      const contactoRepository = getCustomRepository(ContactoRepository)
      const existContacto = await contactoRepository.findOne({id})
      if (existContacto) {
          const result= await  contactoRepository.update({
            id
          },
          {
            description
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Contacto não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const contactoRepository = getCustomRepository(ContactoRepository)
      const existContacto = await contactoRepository.findOne({ id })
      if (existContacto) {
          const result= await  contactoRepository.delete(id)
          return res.status(200).json({ message: "Contacto eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Contacto não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new ContactoController;