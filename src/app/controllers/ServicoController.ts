import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ServicoRepository from '../../repositories/ServicoRepository';
import * as Yup from "yup";


class ServicoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        preco: Yup.number().required(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  servicoRepository = getCustomRepository(ServicoRepository)
      const { name, preco } = req.body;
      const existServico = await  servicoRepository.findOne({ name })
      if (existServico) {
        return res.status(404).json({message:'Servico já existente!'})
      }
      const Servico =  servicoRepository.create({
        name,
        preco,
      });
      await servicoRepository.save(Servico)
      return res.status(201).json(Servico)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const servicoRepository = getCustomRepository(ServicoRepository)
      const existServico = await servicoRepository.find()
      if (existServico) {
        const result = existServico
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Servico não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const servicoRepository = getCustomRepository(ServicoRepository)
    const existServico = await servicoRepository.findOne({ id })
    if (existServico) {
      const result = existServico;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Servico não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        preco: Yup.number().required(),
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name, preco } = req.body
      const servicoRepository = getCustomRepository(ServicoRepository)
      const existServico = await servicoRepository.findOne({ id })
      if (existServico) {
          const result= await  servicoRepository.update({
            id
          },
          {
            name, 
            preco,
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Servico não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const servicoRepository = getCustomRepository(ServicoRepository)
      const existServico = await servicoRepository.findOne({ id })
      if (existServico) {
          const result= await  servicoRepository.delete(id)
          return res.status(200).json({ message: "Servico eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Servico não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new ServicoController;
