import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import TipoFicheiroRepository from '../../repositories/TipoFicheiroRepository';
import * as Yup from "yup";


class TipoFicheiroController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        descricao: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  tipoFicheiroRepository = getCustomRepository(TipoFicheiroRepository)
      const { name ,descricao} = req.body;
      const existTipoFicheiro = await  tipoFicheiroRepository.findOne({ name })
      if ( existTipoFicheiro) {
        return res.status(404).json({message:'Tipo de Ficheiro já existente!'})
      }
      const tipoFicheiro =  tipoFicheiroRepository.create({
        name,
        descricao
      });
      await tipoFicheiroRepository.save(tipoFicheiro)
      return res.status(201).json(tipoFicheiro)
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async index(req: Request, res: Response) {
    try {
      const tipoFicheiroRepository = getCustomRepository(TipoFicheiroRepository)
      const existTipoFicheiro = await tipoFicheiroRepository.find()
      if (existTipoFicheiro) {
        const result = existTipoFicheiro
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Tipo Ficheiro não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const tipoFicheiroRepository = getCustomRepository(TipoFicheiroRepository)
    const existTipoFicheiro = await tipoFicheiroRepository.findOne({ id })
    if (existTipoFicheiro) {
      const result = existTipoFicheiro;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Tipo de Ficheiro não encontado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        descricao: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name, descricao } = req.body
      const tipoFicheiroRepository = getCustomRepository(TipoFicheiroRepository)
      const existTipoFicheiro = await tipoFicheiroRepository.findOne({id})
      if (existTipoFicheiro) {
          const result= await  tipoFicheiroRepository.update({
            id
          },
          {
            name, 
            descricao
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Tipo de Ficheiro não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const tipoFicheiroRepository = getCustomRepository(TipoFicheiroRepository)
      const existTipoFicheiro = await tipoFicheiroRepository.findOne({ id })
      if (existTipoFicheiro) {
          const result= await  tipoFicheiroRepository.delete(id)
          return res.status(200).json({ message: "Tipo de Ficheiro eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Tipo de Ficheiro não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new TipoFicheiroController;
 