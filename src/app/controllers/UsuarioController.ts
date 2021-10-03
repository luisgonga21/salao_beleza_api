import 'reflect-metadata' 
import { Request, Response } from 'express'
import {getCustomRepository} from 'typeorm'
import UsuarioRepository from '../../repositories/UsuarioRepository';
import * as Yup from "yup";
import TipoUsuarioRepository from '../../repositories/TipoUsuarioRepository';
import CargoRepository from '../../repositories/CargoRepository';
import EnderecoRepository from '../../repositories/EnderecoRepository';


class UsuarioController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        numeroBi: Yup.string().required(),
        dataNascimento: Yup.string().required(),
        genero: Yup.string().required(),
        estadoCivil: Yup.string(),
        tipoUsuarioId: Yup.string(),
        cargoId: Yup.string(),
        enderecoId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const  usuarioRepository = getCustomRepository(UsuarioRepository)
      const  cargoRepository = getCustomRepository(CargoRepository)
      const  enderecoRepository = getCustomRepository(EnderecoRepository)
      const { tipoUsuarioId } = req.params;
      const { name , dataNascimento, numeroBi, genero, estadoCivil, cargoId, enderecoId } = req.body;
      const existUsuario = await  usuarioRepository.findOne({ numeroBi })
      const ExisteTipoUsuario = await tipoUsuarioRepository.findOne({where: {id: tipoUsuarioId }})
      const ExisteCargo = await cargoRepository.findOne({where: {id: cargoId }})
      const ExisteEndereco = await enderecoRepository.findOne({where: {id: enderecoId}})
      if ( existUsuario) {
        return res.status(404).json({message:'usuário já existente!'})
      }
      if (!ExisteTipoUsuario) {
        return res.status(404).json({ message: 'Tipo Usuario não encontrado!!' })
      }
      if (!ExisteCargo) {
        return res.status(404).json({ message: 'Cargo não encontrado!!' })
      }
      if (!ExisteEndereco) {
        return res.status(404).json({message:'Endereço não encontrado!'})
      }
      if(ExisteTipoUsuario.name === "Cliente" || ExisteTipoUsuario.name === "Admin"){
        const Usuario =  usuarioRepository.create({
          name,
          numeroBi,
          dataNascimento,
          genero,
          tipoUsuarioId,
          cargoId: null,
          enderecoId
        });
        await usuarioRepository.save(Usuario)
        return res.status(201).json(Usuario)
      }
      const Usuario =  usuarioRepository.create({
          name,
          numeroBi,
          dataNascimento,
          estadoCivil,
          genero,
          tipoUsuarioId,
          cargoId,
          enderecoId
      });
      await usuarioRepository.save(Usuario)
      return res.status(201).json(Usuario)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const existUsuario = await usuarioRepository.find()
      if (existUsuario) {
        const result = existUsuario
        return res.status(200).json(result)
}
      return res.status(402).json({ message: "usuário não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const usuarioRepository = getCustomRepository(UsuarioRepository)
    const existUsuario = await usuarioRepository.findOne({ id })
    if (existUsuario) {
      const result = existUsuario;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "usuário não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        numeroBi: Yup.string().required(),
        dataNascimento: Yup.string().required(),
        genero: Yup.string().required(),
        estadoCivil: Yup.string(),
        cargoId: Yup.string(),
        tipoUsuarioId: Yup.string(),
        enderecoId: Yup.string()
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
      const  usuarioRepository = getCustomRepository(UsuarioRepository)
      const  cargoRepository = getCustomRepository(CargoRepository)
      const { id } = req.params;
      const { name, numeroBi, dataNascimento, genero, estadoCivil, cargoId, tipoUsuarioId } = req.body
      const ExistTipoUsuario = await tipoUsuarioRepository.findOne({where: {id: tipoUsuarioId}})
      const ExisteCargo = await cargoRepository.findOne({where: {id: cargoId}})
      const usuario = await usuarioRepository.findOne(id)
      if(!ExistTipoUsuario){
        return res.status(404).json({message: "Esse Tipo de usuário não existe!"})
      }
      if(!ExisteCargo){
        return res.status(404).json({message: "Esse Cargo não existe!"})
      }
      const updateOneUsuario = 1
      const Usuario= await  usuarioRepository.update({id},{name, numeroBi, dataNascimento, genero, estadoCivil, cargoId, tipoUsuarioId})
      if (Usuario.affected === updateOneUsuario) {
        const usuarioUpdated = await usuarioRepository.findOne({ id }) 
        return res.status(200).json({ usuario, usuarioUpdated })
      }
      return res.status(404).json({ message: "usuário não encontrado" })  
    }catch (error) {
      return res.status(404).json("error --->!"+error)
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const usuarioRepository = getCustomRepository(UsuarioRepository)
      const existUsuario = await usuarioRepository.findOne({ id })
      if (existUsuario) {
          const result= await  usuarioRepository.delete(id)
          return res.status(200).json({ message: "usuário eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "usuário não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new UsuarioController;