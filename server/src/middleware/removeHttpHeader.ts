import { Request, Response, NextFunction } from "express";

const removeHttpHeader = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.removeHeader("X-Powered-By");
  next();
};

export default removeHttpHeader;
