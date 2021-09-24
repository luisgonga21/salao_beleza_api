import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import MunicipioRepository from '../../repositories/MunicipioRepository';
import ProvinciaRepository from '../../repositories/ProvinciaRepository';
import * as Yup from "yup";


class MunicipioController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
        provinciaId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  municipioRepository = getCustomRepository(MunicipioRepository)
      const provinciaRepository = getCustomRepository(ProvinciaRepository)
      const { name ,description, provinciaId } = req.body;
      const existProvincia = await  provinciaRepository.findOne({ where: {
        id: provinciaId
      } })
      if (!existProvincia) {
        return res.status(404).json({message:'Provincia Não encontrada!'})
      }
      const existMunicipio = await  municipioRepository.findOne({ name })
      if ( existMunicipio) {
        return res.status(404).json({message:'Municipio já existente!'})
      }
      const Municipio =  municipioRepository.create({
        name,
        description,
        provinciaId,
      });
      await municipioRepository.save(Municipio)
      return res.status(201).json(Municipio)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const municipioRepository = getCustomRepository(MunicipioRepository)
      const existMunicipio = await municipioRepository.find()
      if (existMunicipio) {
        const result = existMunicipio
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Municipio não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const municipioRepository = getCustomRepository(MunicipioRepository)
    const existMunicipio = await municipioRepository.findOne({ id })
    if (existMunicipio) {
      const result = existMunicipio;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Municipio não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string(),
        provinciaId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name, description } = req.body
      const municipioRepository = getCustomRepository(MunicipioRepository)
      const municipio = await municipioRepository.findOne( id )
      const updateOndeMunicipio = 1
      const Municipio= await  municipioRepository.update({id},{name,description})
      if(Municipio.affected === updateOndeMunicipio) {
        const municipioUpdate = await municipioRepository.findOne({id})
        return res.status(200).json({municipio, municipioUpdate})
      }
      return res.status(404).json({ message: "Municipio não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const municipioRepository = getCustomRepository(MunicipioRepository)
      const existMunicipio = await municipioRepository.findOne({ id })
      if (existMunicipio) {
          const result= await  municipioRepository.delete(id)
          return res.status(200).json({ message: "Municipio eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Municipio não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new MunicipioController;