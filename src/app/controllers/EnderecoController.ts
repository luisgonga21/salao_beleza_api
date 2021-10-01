import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import EnderecoRepository from '../../repositories/EnderecoRepository';
import * as Yup from "yup";


class EnderecoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  enderecoRepository = getCustomRepository(EnderecoRepository)
      const { description } = req.body;
      const existEndereco = await  enderecoRepository.findOne({ description })
      if ( existEndereco) {
        return res.status(404).json({message:'Endereco já existente!'})
      }
      const Endereco =  enderecoRepository.create({
        description,
      });
      await enderecoRepository.save(Endereco)
      return res.status(201).json(Endereco)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const enderecoRepository = getCustomRepository(EnderecoRepository)
      const existEndereco = await enderecoRepository.find()
      if (existEndereco) {
        const result = existEndereco
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Endereco não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const enderecoRepository = getCustomRepository(EnderecoRepository)
    const existEndereco = await enderecoRepository.findOne({ id })
    if (existEndereco) {
      const result = existEndereco;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Endereco não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        description: Yup.string(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const { id } = req.params;
      const { description } = req.body
      const enderecoRepository = getCustomRepository(EnderecoRepository)
      const endereco = await enderecoRepository.findOne(id)
      const updateOneEndereco = 1
      const Endereco= await  enderecoRepository.update({id},{description})
      if(Endereco.affected === updateOneEndereco) {
        const enderecoUpdate = await enderecoRepository.findOne({id})
        return res.status(200).json({endereco, enderecoUpdate})
      }
      return res.status(404).json({ message: "Endereco não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const enderecoRepository = getCustomRepository(EnderecoRepository)
      const existEndereco = await enderecoRepository.findOne({ id })
      if (existEndereco) {
          const result= await  enderecoRepository.delete(id)
          return res.status(200).json({ message: "Endereco eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Endereco não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new EnderecoController;

