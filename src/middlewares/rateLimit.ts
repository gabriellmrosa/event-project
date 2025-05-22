import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

// Desabilitar rate limiting em ambiente de teste
const isTestEnvironment = env.NODE_ENV === 'test';

export const createRateLimit = isTestEnvironment 
  ? (req: any, res: any, next: any) => next() // Pular rate limiting em testes
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 requests por IP por janela
      message: {
        message: 'Muitas tentativas. Tente novamente em 15 minutos.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });

export const strictRateLimit = isTestEnvironment
  ? (req: any, res: any, next: any) => next() // Pular rate limiting em testes
  : rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 10, // máximo 10 requests por IP para operações críticas
      message: {
        message: 'Muitas tentativas para esta operação. Tente novamente em 15 minutos.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
