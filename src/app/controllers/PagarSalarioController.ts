import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import PagarSalarioRepository from '../../repositories/PagarSalarioRepository';
import * as Yup from "yup";


class PagarSalarioController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        valorPago: Yup.number().required(),
        valorFalta: Yup.number().required(),
        dataPagamento: Yup.date().required()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
      const { valorPago, valorFalta, dataPagamento } = req.body;
      const existPagarSalario = await  pagarSalarioRepository.findOne({ dataPagamento })
      if (existPagarSalario) {
        return res.status(404).json({message:'PagarSalario já existente!'})
      }
      const PagarSalario =  pagarSalarioRepository.create({
        valorPago, 
        valorFalta,
        dataPagamento
      });
      await pagarSalarioRepository.save(PagarSalario)
      return res.status(201).json(PagarSalario)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
      const existPagarSalario = await pagarSalarioRepository.find()
      if (existPagarSalario) {
        const result = existPagarSalario
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "PagarSalario não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
    const existPagarSalario = await pagarSalarioRepository.findOne({ id })
    if (existPagarSalario) {
      const result = existPagarSalario;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "PagarSalario não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        nif: Yup.string().required(),
        dataPagamento: Yup.date().required()
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { valorFalta, valorPago, dataPagamento } = req.body
      const pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
      const existPagarSalario = await pagarSalarioRepository.findOne({ id })
      if (existPagarSalario) {
          const result= await  pagarSalarioRepository.update({
            id
          },
          {
            valorFalta,
            valorPago,
            dataPagamento
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "PagarSalario não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
      const existPagarSalario = await pagarSalarioRepository.findOne({ id })
      if (existPagarSalario) {
          const result= await  pagarSalarioRepository.delete(id)
          return res.status(200).json({ message: "PagarSalario eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "PagarSalario não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new PagarSalarioController;



