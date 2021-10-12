import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import SalaoRepository from '../../repositories/SalaoRepository';
import * as Yup from "yup";
import EnderecoRepository from '../../repositories/EnderecoRepository';
import FicheiroRepository from '../../repositories/FicheiroRepository';


class SalaoController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      nif: Yup.number().required(),
      telefone1: Yup.number().required(),
      telefone2: Yup.number().required(),
      email: Yup.string().required(),
      quantidadeFuncionario: Yup.number().required(),
      enderecoId: Yup.string(),
      logotipoId: Yup.string()
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json("error validator!");
    };
    try {
      const salaoRepository = getCustomRepository(SalaoRepository)
      const enderecoRepository = getCustomRepository(EnderecoRepository)
      const ficheiroRepository = getCustomRepository(FicheiroRepository)
      const { 
        name, 
        nif, 
        email, 
        telefone1, 
        telefone2, 
        quantidadeFuncionario, 
        enderecoId,
        logotipoId
      } = req.body
      const ExisteEndereco = await enderecoRepository.findOne({where: {id: enderecoId }})
      const existSalao = await  salaoRepository.findOne({ nif })
      const ExisteLogotipo = await ficheiroRepository.findOne({where: {id: logotipoId }})
      if (!ExisteEndereco) {
        return res.status(404).json({message:'Endereço não encontrado!'})
      }
      if (existSalao) {
        return res.status(404).json({message:'Salao já existente!'})
      }
      if (!ExisteLogotipo) {
        return res.status(404).json({message:'Logotipo não encontrado!'})
      }
      const Salao =  salaoRepository.create({
        name, 
        nif, 
        email, 
        telefone1, 
        telefone2, 
        quantidadeFuncionario,
        enderecoId,
        logotipoId
      });
      await salaoRepository.save(Salao)
      return res.status(201).json(Salao)
    }catch (error) {
      return res.status(404).json("error -->!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const salaoRepository = getCustomRepository(SalaoRepository)
      const existSalao = await salaoRepository.find()
      if (existSalao) {
        const result = existSalao
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Salao não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const salaoRepository = getCustomRepository(SalaoRepository)
    const existSalao = await salaoRepository.findOne({ id })
    if (existSalao) {
      const result = existSalao;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Salao não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        nif: Yup.number().required(),
        telefone1: Yup.number().required(),
        telefone2: Yup.number().required(),
        email: Yup.string().required(),
        quantidadeFuncionario: Yup.number().required(),
        enderecoId: Yup.string(),
        logotipoId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { name, nif, email, telefone1, telefone2, quantidadeFuncionario, enderecoId, logotipoId } = req.body
      const salaoRepository = getCustomRepository(SalaoRepository)
      const salao = await salaoRepository.findOne(id)
      const updateOneSalao = 1
      const Salao= await  salaoRepository.update({id},{name, nif, email, telefone1, telefone2, quantidadeFuncionario, enderecoId, logotipoId })
      if(Salao.affected === updateOneSalao) {
        const salaoUpdate = await salaoRepository.findOne({id})
        return res.status(200).json({salao, salaoUpdate})
      }
      return res.status(404).json({ message: "Salao não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const salaoRepository = getCustomRepository(SalaoRepository)
      const existSalao = await salaoRepository.findOne({ id })
      if (existSalao) {
          const result= await  salaoRepository.delete(id)
          return res.status(200).json({ message: "Salao eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Salao não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new SalaoController;



