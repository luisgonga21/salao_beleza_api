import * as Yup from "yup";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import PermissaoRepository from "../../repositories/PermissaoRepository";
import PermissaoTipoUsuarioRepository from "../../repositories/PermissaoTipoUsuarioRepository";
import TipoUsuarioRepository from "../../repositories/TipoUsuarioRepository";



class PermissaoTipoUsuarioController {
    async index(req: Request, res: Response) {
        try {
        const permissaoTipoUsuarioRepository = getCustomRepository(PermissaoTipoUsuarioRepository);
        const permissaoTipoUsuario = await permissaoTipoUsuarioRepository.find();
        return res.status(200).json({
            "Permissão do Tipo de Usuario":
            permissaoTipoUsuario,
        });
        } catch (error) {
            return res.status(404).json("error!")
        }
    }

    async store(req: Request, res: Response) {

        try {
            const permissaoTipoUsuarioRepository = getCustomRepository(PermissaoTipoUsuarioRepository);
            const permissaoRepository = getCustomRepository(PermissaoRepository)
            const tipoUsuarioRepository = getCustomRepository(TipoUsuarioRepository)
            const { tipoUsuarioId, permissaoId } = req.body;
            const PermissaoTipoUsuarioExiste = await permissaoTipoUsuarioRepository.findOne({
                where: { permissaoId , tipoUsuarioId }
            });
            const ExistePermissao = await permissaoRepository.findOne({where: {id: permissaoId}});
            const ExisteTipoUsuario = await tipoUsuarioRepository.findOne({where: {id: tipoUsuarioId}});
            if(!ExistePermissao){
                return res.status(400).json({ message: "Permissão Não encontrada!" });
            }
            if(!ExisteTipoUsuario){
                return res.status(400).json({ message: "Tipo de Usuário Não encontrado!" });
            }
            if(PermissaoTipoUsuarioExiste){
                return res.status(400).json({ message: "O Tipo de Usuario já tem essa Permissão!" });
            }
            const permissaoUsuario = permissaoTipoUsuarioRepository.create({
                tipoUsuarioId, 
                permissaoId,
            });
            await permissaoTipoUsuarioRepository.save(permissaoUsuario);
            return res.status(200).json({
                "Permissões do Tipo de Usuario:":
                permissaoUsuario,
            });
        } catch (error) {
            return res.status(405).json("error -->"+error)
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const permissaoTipoUsuarioRepository = getCustomRepository(PermissaoTipoUsuarioRepository);
            const { tipoUsuarioId } = req.params;
            const PermissaoTipoUsuarioExiste = await permissaoTipoUsuarioRepository.findOne({where: {tipoUsuarioId: tipoUsuarioId}});
            if (PermissaoTipoUsuarioExiste) {
                const result = PermissaoTipoUsuarioExiste;
                return res.status(200).json(result);
            }
            return res.status(401).json({ error: "Permissãoo do Tipo de Usuario Não Encontrada!" });
        } 
        catch (error) {
            return res.status(404).json("error!")
        }
    }

    async update(req: Request, res: Response) {
        const schema = Yup.object().shape({
            permissaoId: Yup.string(),
            tipoUsuarioId: Yup.string(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json("error validação!");
        };
        try {
        const permissaoTipoUsuarioRepository = getCustomRepository(PermissaoTipoUsuarioRepository);
        const { id } = req.params;
        const { permissaoId } = req.body;
        const permissaoTipoUsuario = await permissaoTipoUsuarioRepository.findOne({ id });
        if(permissaoTipoUsuario){
            const result = await permissaoTipoUsuarioRepository.update(
                { id: id },
                { permissaoId: permissaoId },
            );
            return res.status(200).json({ message: "Permissão do Tipo de Usuario Alterado com sucesso!" });
        }
        return res.status(401).json({ error: "Permissão do Tipo de Usuario não encontrada!" });
        }  
        catch (error) {
            return res.status(404).json("error!")
        }
    }

    async delete(req: Request, res: Response) {
        try{
            const permissaoTipoUsuarioRepository = getCustomRepository(PermissaoTipoUsuarioRepository);
            const { id } = req.params;
            const TipoUsuario = await permissaoTipoUsuarioRepository.findOne({id});
            if (TipoUsuario) {
                const result = await permissaoTipoUsuarioRepository.delete(id);
                return res.status(200).json({ message: "Permissão do Tipo de Usuario Eliminado com sucesso!"});
            }
            return res.status(401).json({ error: "Permissão do Tipo de Usuario não encontrada!" });    
        } 
        catch (error) {
            return res.status(404).json("error!")
        }
    }
    
}



export default new PermissaoTipoUsuarioController;