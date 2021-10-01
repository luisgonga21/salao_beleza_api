import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ProvinciaRepository from '../../repositories/ProvinciaRepository';
import * as Yup from "yup";


class ProvinciaController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  provinciaRepository = getCustomRepository(ProvinciaRepository)
      const { name ,description } = req.body;
      const existProvincia = await  provinciaRepository.findOne({ name })
      if ( existProvincia) {
        return res.status(404).json({message:'Provincia já existente!'})
      }
      const Provincia =  provinciaRepository.create({
        name,
        description,
      });
      await provinciaRepository.save(Provincia)
      return res.status(201).json(Provincia)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const provinciaRepository = getCustomRepository(ProvinciaRepository)
      const existProvincia = await provinciaRepository.find()
      if (existProvincia) {
        const result = existProvincia
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Provincia não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const provinciaRepository = getCustomRepository(ProvinciaRepository)
    const existProvincia = await provinciaRepository.findOne({ id })
    if (existProvincia) {
      const result = existProvincia;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Provincia não encontrado!" })
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
      const provinciaRepository = getCustomRepository(ProvinciaRepository)
      const provincia = await provinciaRepository.findOne(id)
      const updateOneProvincia = 1
      const Provincia= await  provinciaRepository.update({id},{name,description})
      if(Provincia.affected === updateOneProvincia){
        const provinciaUpdated = await provinciaRepository.findOne({ id })
        return res.status(200).json({provincia, provinciaUpdated})
      }
      return res.status(404).json({ message: "Provincia não encontrada" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const provinciaRepository = getCustomRepository(ProvinciaRepository)
      const existProvincia = await provinciaRepository.findOne({ id })
      if (existProvincia) {
          const result= await  provinciaRepository.delete(id)
          return res.status(200).json({ message: "Provincia eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Provincia não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new ProvinciaController;