import { Request, Response, NextFunction } from 'express';
import { isValidUUID } from '../utils/isValidUUID';

export const validateUUID = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];
    
    if (!id) {
      return res.status(400).json({ 
        message: `Parâmetro '${paramName}' é obrigatório` 
      });
    }
    
    if (!isValidUUID(id)) {
      return res.status(400).json({ 
        message: `${paramName} inválido. Deve ser um UUID válido.` 
      });
    }
    
    next();
  };
};

export const validateEventId = validateUUID('eventId');
export const validateId = validateUUID('id');
export const validateBatchId = validateUUID('batchId');
