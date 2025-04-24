import { Request, Response, NextFunction } from 'express';

export const validateIdParam = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawValue = req.params[paramName];
    const parsed = parseInt(rawValue, 10);

    if (isNaN(parsed)) {
      return res.status(400).json({ error: `Invalid ID for param "${paramName}".` });
    }

    // opcional: armazenar valor já parseado para uso posterior
    (req as any)[paramName] = parsed;

    next();
  };
};
