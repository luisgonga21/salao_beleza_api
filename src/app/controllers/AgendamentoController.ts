import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import AgendamentoRepository from '../../repositories/AgendamentoRepository';
import * as Yup from "yup";
import UsuarioRepository from '../../repositories/UsuarioRepository';

class AgendamentoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        dataAgendamento: Yup.date().required(),
        funcionarioId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  usuarioRepository = getCustomRepository(UsuarioRepository)
      const  agendamentoRepository = getCustomRepository(AgendamentoRepository)
      const { dataAgendamento, funcionarioId } = req.body;
      const atendente = await  usuarioRepository.findOne({ where: { id: funcionarioId }})
      const Agendamento =  agendamentoRepository.create({
        dataAgendamento,
      });
      await agendamentoRepository.save(Agendamento)
      return res.status(201).json(Agendamento)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };


  async index(req: Request, res: Response) {
    try {
      const agendamentoRepository = getCustomRepository(AgendamentoRepository)
      const existAgendamento = await agendamentoRepository.find()
      if (existAgendamento) {
        const result = existAgendamento
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Agendamento não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const agendamentoRepository = getCustomRepository(AgendamentoRepository)
    const existAgendamento = await agendamentoRepository.findOne({ id })
    if (existAgendamento) {
      const result = existAgendamento;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Agendamento não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        dataAgendamento: Yup.date().required(),
        cancelamento: Yup.date(),
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { dataAgendamento, cancelamento } = req.body
      const agendamentoRepository = getCustomRepository(AgendamentoRepository)
      const agendamento = await agendamentoRepository.findOne(id)
      const updatedOneAgendamento = 1
      const TipoUsuario= await  agendamentoRepository.update({id},{
        dataAgendamento, 
        cancelamento,})
      if (TipoUsuario.affected === updatedOneAgendamento) {
        const agendamentoUpdated = await agendamentoRepository.findOne({ id }) 
        return res.status(200).json({agendamento, agendamentoUpdated})
      }
      return res.status(404).json({ message: "Agendamento não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const agendamentoRepository = getCustomRepository(AgendamentoRepository)
      const existAgendamento = await agendamentoRepository.findOne({ id })
      if (existAgendamento) {
          const result= await  agendamentoRepository.delete(id)
          return res.status(200).json({ message: "Agendamento eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Agendamento não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new AgendamentoController;

