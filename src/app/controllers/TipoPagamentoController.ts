import 'reflect-metadata' 
import { Request, Response } from 'express'
import {getCustomRepository} from 'typeorm'
import TipoPagamentoRepository from '../../repositories/TipoPagamentoRepository';
import * as Yup from "yup";


class TipoPagamentoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),

      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  tipoPagamentoRepository = getCustomRepository(TipoPagamentoRepository)
      const { name } = req.body;
      const existTipoPagamento = await  tipoPagamentoRepository.findOne({ name })
      if ( existTipoPagamento) {
        return res.status(404).json({message:'Tipo Pagamento já existente!'})
      }
      const TipoPagamento =  tipoPagamentoRepository.create({
        name,
      });
      await tipoPagamentoRepository.save(TipoPagamento)
      return res.status(201).json(TipoPagamento)
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async index(req: Request, res: Response) {
    try {
      const tipoPagamentoRepository = getCustomRepository(TipoPagamentoRepository)
      const existTipoPagamento = await tipoPagamentoRepository.find()
      if (existTipoPagamento) {
        const result = existTipoPagamento
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Tipo Pagamento não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const tipoPagamentoRepository = getCustomRepository(TipoPagamentoRepository)
    const existTipoPagamento = await tipoPagamentoRepository.findOne({ id })
    if (existTipoPagamento) {
      const result = existTipoPagamento;
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
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name } = req.body
      const tipoPagamentoRepository = getCustomRepository(TipoPagamentoRepository)
      const existTipoPagamento = await tipoPagamentoRepository.findOne({id})
      if (existTipoPagamento) {
          const result= await  tipoPagamentoRepository.update({
            id
          },
          {
            name, 
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Tipo Pagamento não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const tipoPagamentoRepository = getCustomRepository(TipoPagamentoRepository)
      const existTipoPagamento = await tipoPagamentoRepository.findOne({ id })
      if (existTipoPagamento) {
          const result= await  tipoPagamentoRepository.delete(id)
          return res.status(200).json({ message: "Tipo Pagamento eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Tipo Pagamento não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new TipoPagamentoController;