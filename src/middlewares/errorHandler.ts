import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro capturado:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Dados de entrada inválidos',
      errors: err.errors.map((error) => ({
        campo: error.path.join('.'),
        mensagem: error.message,
      })),
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Dados inválidos',
      errors: err.message,
    });
  }

  if (err.message.includes('violates foreign key constraint')) {
    return res.status(400).json({
      message: 'Referência inválida. Verifique se o recurso relacionado existe.',
    });
  }

  if (err.message.includes('duplicate key value')) {
    return res.status(409).json({
      message: 'Recurso já existe. Dados duplicados não são permitidos.',
    });
  }

  return res.status(500).json({
    message: 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(process.env.NODE_ENV === 'test' && { 
      stack: err.stack,
      originalError: err.message 
    }),
  });
};
