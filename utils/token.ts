import { Token } from "@/interface";
import jwt from "jsonwebtoken";

export const createToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY as jwt.Secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY as jwt.Secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
