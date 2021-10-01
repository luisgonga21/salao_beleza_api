import * as Yup from 'yup';
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import FicheiroRepository from '../../repositories/FicheiroRepository';
import TipoFicheiroRepository from '../../repositories/TipoFicheiroRepository';

class FicheiroController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      path:Yup.string(),
      tipoFicheiroId: Yup.string()
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ message: "error de validation!" });
    }
    try {
      const typeFicheiroRepository = getCustomRepository(TipoFicheiroRepository)
      const ficheiroRepository = getCustomRepository(FicheiroRepository)
      const { tipoFicheiroId } = req.params
      const ExistTipoFicheiro = typeFicheiroRepository.findOne({where: { id: tipoFicheiroId} })
      const { originalname: name, filename: path } = req.file;
      if(!ExistTipoFicheiro) {
        return res.status(404).json({message: "Tipo de ficheiro não existente!"})
      }
      const ficheiro =  ficheiroRepository.create({
        name, 
        path,
        tipoFicheiroId
      });
      await ficheiroRepository.save(ficheiro)
      return res.status(201).json(ficheiro)
      } catch (error) {
      return res.status(500).json({error:"erro -->" +error })
    }
  };

  async index(req: Request, res: Response) {
    try {
      const ficheiroRepository = getCustomRepository(FicheiroRepository)
      const ficheiro = await ficheiroRepository.find();
      return res.status(200).json(ficheiro)
    } catch (error) {
      return res.status(500).json({error:"error"})
    } 
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ficheiroRepository = getCustomRepository(FicheiroRepository)
      const existFile = await ficheiroRepository.findOne({where: {id: id} })
      if (existFile) {
        const result = existFile
        return res.status(200).json(result)
      }
      return res.status(404).json({ message: "Ficheiro não encontrado!" })
    } catch (error) {
        return res.status(500).json({ error: "error"})
    }
  };

  async update(req: Request, res: Response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      path:Yup.string()
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ message: "erro de validação!" });
    }
    try {
      const ficheiroRepository = getCustomRepository(FicheiroRepository)
      const { id }= req.params;
      const { originalname: name, filename: path } = req.file;
      const ficheiroOld= await ficheiroRepository.findOne({ id })
      if (!ficheiroOld) {
        return res.status(404).json({ message: "Ficheiro não encontrado " })
      }
      const updatedOneFicheiro = 1
      const ficheiro =  await ficheiroRepository.update({ 
        id 
      }, 
      { 
        name, 
        path
      })
      if (ficheiro.affected === updatedOneFicheiro) {
        const ficheiroUpdated = await ficheiroRepository.findOne({ id })
        return res.status(200).json({ficheiroOld, ficheiroUpdated})
      }
    } catch (error) {
        return res.status(500).json({ error: "error"})
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ficheiroRepository = getCustomRepository(FicheiroRepository)
      const existFicheiro = await ficheiroRepository.findOne({id})
      if (!existFicheiro) {
        return res.status(404).json({ message: "Ficheiro não encontrado" })
      }
      const deletedOneFicheiro = 1
      const ficheiro =  await ficheiroRepository.delete({ id })
      if (ficheiro.affected === deletedOneFicheiro) {
        const ficheiroDeleted =  existFicheiro
          return res.status(200).json({ message:"Ficheiro eliminado com sucesso!"+ ficheiroDeleted.name })
        }
      } catch (error) {
        return res.status(500).json({ error: "error"})
    }
  }
}


export default new FicheiroController;
 
 