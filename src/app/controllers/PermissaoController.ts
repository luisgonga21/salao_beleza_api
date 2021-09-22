import 'reflect-metadata' 
import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import PermissaoRepository from "../../repositories/PermissaoRepository";
import * as Yup from "yup";

class PermissaoController {
    async index(req: Request, res: Response){
        try {
            const permissaoRepository = getCustomRepository(PermissaoRepository);  
            const permissaos = await permissaoRepository.find();
            return res.json(permissaos);  
        } catch (error) {
            return res.status(404).json("error!"+error)
        }
    }

    async store(req: Request, res: Response) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                description: Yup.string(),
              });
              if(!(await schema.isValid(req.body))){
                  return res.status(400).json("error validator!");
              };
              const permissaoRepository = getCustomRepository(PermissaoRepository);  
              const { name, description } = req.body;
              const existPermissao = await permissaoRepository.findOne({name});
              if(existPermissao) {
                  return res.status(400).json({message: "Permissao already exists!!"});
              }
              const permissao = permissaoRepository.create({
                  name,
                  description,
              })
              await permissaoRepository.save(permissao);
              return res.status(201).json(permissao);
        } catch (error) {
            return res.status(404).json("error!"+error)
        }
    }

    async getOne(req: Request, res: Response) {
        try {
          const { id } = req.params;
        const permissaoRepository = getCustomRepository(PermissaoRepository)
        const existPermissao = await permissaoRepository.findOne({ id })
        if (existPermissao) {
          const result = existPermissao;
          return res.status(200).json(result)
        }
        return res.status(404).json({ message: "Permissao não encontrado!" })
        }catch (error) {
          return res.status(404).json("error!")
        }
      };
    
      async update(req: Request, res: Response) {
        try {
          const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
          });
          if(!(await schema.isValid(req.body))){
              return res.status(400).json("error validator!");
          };
          const { id } = req.params;
          const { name, description } = req.body
          const permissaoRepository = getCustomRepository(PermissaoRepository)
          const existPermissao = await permissaoRepository.findOne({id})
          if (existPermissao) {
              const result= await  permissaoRepository.update({
                id
              },
              {
                name, 
                description
              })
            return res.status(201).json(result)
          }
          return res.status(404).json({ message: "Permissao não encontrado" })  
        }catch (error) {
          return res.status(404).json("error!")
        }
      };
    
      async delete(req: Request, res: Response) {
        try {
          const {id} = req.params;
          const permissaoRepository = getCustomRepository(PermissaoRepository)
          const existPermissao = await permissaoRepository.findOne({ id })
          if (existPermissao) {
              const result= await  permissaoRepository.delete(id)
              return res.status(200).json({ message: "Permissao eliminado com sucesso!" });
            }
          return res.status(404).json({ message: "Permissao não encontrado" })
        } catch (error) {
          return res.status(404).json("error!")
        }
      }
}


export default new PermissaoController;
