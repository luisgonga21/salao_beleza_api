import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import Usuario from "../models/Usuario";
import UsuarioRepository from "../repositories/UsuarioRepository";

async function decoder(request: Request): Promise<Usuario | undefined>{
    const authHeader = request.headers.authorization || "";
    const userRepository = getCustomRepository(UsuarioRepository)
    const [, token] = authHeader?.split(" ");
    const payload = decode(token);
    const user = await userRepository.findOne(payload?.substring, { relations: ["roles"]});
    return user;
}

function is(role: String[]) {
    const roleAuthorized = async(
        request: Request, 
        response: Response, 
        next: NextFunction
    ) => {
        const user = await decoder(request);
        const userRoles = user?.roles.map(role => role.name);
        const existsRoles = userRoles?.some(r => role.includes(r));
        if(existsRoles) {
            return next();
        }
        return response.status(401).json({message: "Not authorized!!"})
    };

    return roleAuthorized;
}

export { is };