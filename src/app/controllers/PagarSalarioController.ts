import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import PagarSalarioRepository from '../../repositories/PagarSalarioRepository';
import * as Yup from "yup";


class PagarSalarioController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        numeroTransacao: Yup.string(),
        valorPago: Yup.number().required(),
        tipoPagamentoId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const  pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
      const { valorPago, numeroTransacao, tipoPagamentoId } = req.body;
      const existPagarSalario = await  pagarSalarioRepository.findOne({ valorPago })
      if (existPagarSalario) {
        return res.status(404).json({message:'Salario já existente!'})
      }
      const recebe = valorPago
      const PagarSalario =  pagarSalarioRepository.create({
        valorPago, 
        valorFalta: recebe*2,
        numeroTransacao,
        tipoPagamentoId
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
        numeroTransacao: Yup.string(),
        valorPago: Yup.number().required()
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { valorPago, numeroTransacao } = req.body
      const pagarSalarioRepository = getCustomRepository(PagarSalarioRepository)
      const pagarSalario = await pagarSalarioRepository.findOne(id)
      const updateOndePagarSalario = 1
      const PagarSalario= await  pagarSalarioRepository.update({id},{numeroTransacao, valorPago})
      if(PagarSalario.affected === updateOndePagarSalario) {
        const pagarSalarioUpdate = await pagarSalarioRepository.findOne({id})
        return res.status(200).json({pagarSalario, pagarSalarioUpdate})
      }
      return res.status(404).json({ message: "Pagar Salario não encontrado" })  
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



