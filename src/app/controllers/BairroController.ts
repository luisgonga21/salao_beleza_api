import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import BairroRepository from '../../repositories/BairroRepository';
import MunicipioRepository from '../../repositories/MunicipioRepository';
import * as Yup from "yup";


class BairroController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        municipioId: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  bairroRepository = getCustomRepository(BairroRepository)
      const municipioRepository = getCustomRepository(MunicipioRepository)
      const { name, municipioId } = req.body;
      const existeMunicipio = municipioRepository.findOne({
        where: { id: municipioId }
      })
      if (!existeMunicipio) {
        return res.status(404).json({message:'Municipio não encontrado!'})
      }
      const existBairro = await  bairroRepository.findOne({ name })
      if (existBairro) {
        return res.status(404).json({message:'Bairro já existente!'})
      }
      const Bairro =  bairroRepository.create({
        name,
        municipioId,
      });
      await bairroRepository.save(Bairro)
      return res.status(201).json(Bairro)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const bairroRepository = getCustomRepository(BairroRepository)
      const existBairro = await bairroRepository.find()
      if (existBairro) {
        const result = existBairro
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Bairro não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const bairroRepository = getCustomRepository(BairroRepository)
    const existBairro = await bairroRepository.findOne({ id })
    if (existBairro) {
      const result = existBairro;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Bairro não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name } = req.body
      const bairroRepository = getCustomRepository(BairroRepository)
      const bairro = await bairroRepository.findOne(id)
      const updateOneBairro = 1
      const Bairro= await  bairroRepository.update({id},{name})
      if (Bairro.affected === updateOneBairro) {
        const bairroUpdated = await bairroRepository.findOne({ id }) 
        return res.status(200).json({bairro, bairroUpdated})
      }
      return res.status(404).json({ message: "Bairro não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const bairroRepository = getCustomRepository(BairroRepository)
      const existBairro = await bairroRepository.findOne({ id })
      if (existBairro) {
          const result= await  bairroRepository.delete(id)
          return res.status(200).json({ message: "Bairro eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Bairro não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new BairroController;

