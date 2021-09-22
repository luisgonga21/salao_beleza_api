import 'reflect-metadata' 
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import CargoRepository from '../../repositories/CargoRepository';
import * as Yup from "yup";


class CargoController {
  async store(req: Request, res: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        salario: Yup.number().required(),
      });
      if(!(await schema.isValid(req.body))){
          return res.status(400).json("error validator!");
      };
      const  cargoRepository = getCustomRepository(CargoRepository)
      const { name, salario } = req.body;
      const existCargo = await  cargoRepository.findOne({ name })
      if (existCargo) {
        return res.status(404).json({message:'Cargo já existente!'})
      }
      const Cargo =  cargoRepository.create({
        name,
        salario,
      });
      await cargoRepository.save(Cargo)
      return res.status(201).json(Cargo)
    }catch (error) {
      return res.status(404).json("error!"+error)
    }
  };

  async index(req: Request, res: Response) {
    try {
      const cargoRepository = getCustomRepository(CargoRepository)
      const existCargo = await cargoRepository.find()
      if (existCargo) {
        const result = existCargo
        return res.status(200).json(result)
      }
      return res.status(402).json({ message: "Cargo não encontrado!" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
    const cargoRepository = getCustomRepository(CargoRepository)
    const existCargo = await cargoRepository.findOne({ id })
    if (existCargo) {
      const result = existCargo;
      return res.status(200).json(result)
    }
    return res.status(404).json({ message: "Cargo não encontrado!" })
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async update(req: Request, res: Response) {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            salario: Yup.number().required(),
          });
          if(!(await schema.isValid(req.body))){
              return res.status(400).json("error validator!");
          };
      const { id } = req.params;
      const { name } = req.body
      const cargoRepository = getCustomRepository(CargoRepository)
      const existCargo = await cargoRepository.findOne({id})
      if (existCargo) {
          const result= await  cargoRepository.update({
            id
          },
          {
            name, 
          })
        return res.status(201).json(result)
      }
      return res.status(404).json({ message: "Cargo não encontrado" })  
    }catch (error) {
      return res.status(404).json("error!")
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const cargoRepository = getCustomRepository(CargoRepository)
      const existCargo = await cargoRepository.findOne({ id })
      if (existCargo) {
          const result= await  cargoRepository.delete(id)
          return res.status(200).json({ message: "Cargo eliminado com sucesso!" });
        }
      return res.status(404).json({ message: "Cargo não encontrado" })
    } catch (error) {
      return res.status(404).json("error!")
    }
  }
}


export default new CargoController;