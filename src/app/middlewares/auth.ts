import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import jwt  from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/authConfig";

class auth {
  async auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "O token não é do funcionário!" });
    }
    const [, token] = authHeader.split(" ");
    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.key);
      const usuarioId  = decoded;
      req.usuarioId = usuarioId;
      console.log("req.usuarioid ->", req.usuarioId);
      return next();
    } catch (err) {
      return res.status(400).json({ error: "token inválido " });
    }
  }
};

export default new auth;
