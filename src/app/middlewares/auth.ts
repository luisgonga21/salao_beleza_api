import jwt  from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/authConfig";

module.exports = {
  async auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "token nao e da credora!" });
    }
    const [, token] = authHeader.split(" ");
    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.key);
      const escolaId  = decoded;
      req.escolaId = escolaId;
      console.log("re.usuarioid ->", req.escolaId);
      return next();
    } catch (err) {
      return res.status(400).json({ error: "token invalido " });
    }
  },
};
