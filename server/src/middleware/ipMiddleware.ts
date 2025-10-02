import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      clientIp?: string;
    }
  }
}

export const getClientIp = (req: Request): string => {
  try {
    
    const xForwardedFor = req.headers["x-forwarded-for"];
    if (xForwardedFor) {
      const ips = Array.isArray(xForwardedFor)
        ? xForwardedFor
        : xForwardedFor.split(",").map((ip) => ip.trim());

      if (ips.length > 0 && ips[0]) {
        return ips[0];
      }
    }

    const xRealIp = req.headers["x-real-ip"];
    if (xRealIp) {
      return Array.isArray(xRealIp) ? xRealIp[0] || "unknown" : xRealIp;
    }

    if (req.socket?.remoteAddress) {
      return req.socket.remoteAddress;
    }

    if (req.ip) {
      return req.ip;
    }

    return "unknown";
  } catch (error) {
    console.error("Error getting client IP:", error);
    return "unknown";
  }
};

const ipMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.clientIp = getClientIp(req);
  next();
};

export default ipMiddleware;
