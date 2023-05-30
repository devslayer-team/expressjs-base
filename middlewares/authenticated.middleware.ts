import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpException, Token } from "@/interface";
import { verifyToken } from "@/utils";

export async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, "Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();
  try {
   
    req.id = null;

    const payload: Token | jwt.JsonWebTokenError = await verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Unauthorised"));
    } else {
        req.id = payload.id;
    }

    return next();
  } catch (error) {
    return next(new HttpException(401, "Unauthorised"));
  }
}

