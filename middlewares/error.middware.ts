import { HttpException } from "@/interface";
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
}
