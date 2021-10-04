import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import EnderecoRepository from '../../repositories/EnderecoRepository';
import * as Yup from "yup";
import ProvinciaRepository from '../../repositories/ProvinciaRepository';
import MunicipioRepository from '../../repositories/MunicipioRepository';
import BairroRepository from '../../repositories/BairroRepository';
class EnderecoController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      numeroCasa: Yup.number().required(),
      provinciaId: Yup.string(),
      municipioId: Yup.string(),
      bairroId: Yup.string()
    });
    if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
    };
    try {
      const  enderecoRepository = getCustomRepository(EnderecoRepository)
      const  provinciaRepository = getCustomRepository(ProvinciaRepository)
      const  municipioRepository = getCustomRepository(MunicipioRepository)
      const  bairroRepository = getCustomRepository(BairroRepository)
      const { rua, numeroCasa, provinciaId, municipioId, bairroId } = req.body;
      const existProvincia = await  provinciaRepository.findOne({where: {id: provinciaId } })
      if (!existProvincia) {
        return res.status(404).json({message:'Provincia não encontrado!'})
      }
      const existMunicipio = await  municipioRepository.findOne({where: {id: municipioId } })
      if (!existMunicipio) {
        return res.status(404).json({message:'Municipio não encontrado!'})
      }
      const existBairro = await  bairroRepository.findOne({where: {id: bairroId } })
      if (!existBairro) {
        return res.status(404).json({message:'Bairro não encontrado!'})
      }
      const Endereco =  enderecoRepository.create({
        rua, 
        numeroCasa, 
        provinciaId, 
        municipioId, 
        bairroId
      });
      await enderecoRepository.save(Endereco)
      return res.status(201).json(Endereco)
    }catch (error) {
      return res.status(404).json("error !"+error)
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
    const schema = Yup.object().shape({
      rua: Yup.string().required(),
      numeroCasa: Yup.number().required(),
      provinciaId: Yup.string(),
      municipioId: Yup.string(),
      bairroId: Yup.string()
    });
    if(!(await schema.isValid(req.body))){
        return res.status(400).json("error validator!");
    };
    try {
      const  enderecoRepository = getCustomRepository(EnderecoRepository)
      const  provinciaRepository = getCustomRepository(ProvinciaRepository)
      const  municipioRepository = getCustomRepository(MunicipioRepository)
      const  bairroRepository = getCustomRepository(BairroRepository)
      const { id } = req.params;
      const {
        rua, 
        numeroCasa, 
        provinciaId, 
        municipioId, 
        bairroId
      } = req.body
      const existProvincia = await  provinciaRepository.findOne({where: {id: provinciaId } })
      if (!existProvincia) {
        return res.status(404).json({message:'Provincia não encontrado!'})
      }
      const existMunicipio = await  municipioRepository.findOne({where: {id: municipioId } })
      if (!existMunicipio) {
        return res.status(404).json({message:'Municipio não encontrado!'})
      }
      const existBairro = await  bairroRepository.findOne({where: {id: bairroId } })
      if (!existBairro) {
        return res.status(404).json({message:'Bairro não encontrado!'})
      } 
      const endereco = await enderecoRepository.findOne(id)
      const updateOneEndereco = 1
      const Endereco= await  enderecoRepository.update(
        { id },
        {
          rua, 
          numeroCasa, 
          provinciaId, 
          municipioId, 
          bairroId
        }
        )
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

