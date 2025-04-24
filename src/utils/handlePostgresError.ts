import { Response } from 'express';

export function handlePostgresError(error: any, res: Response): Response {
  if (error.code === '23503') {
    // Violação de chave estrangeira
    const constraint = error.constraint || '';

    if (constraint.includes('lotes_event_id_fkey')) {
      return res.status(404).json({ error: 'Related event not found' });
    }

    // Você pode adicionar mais regras aqui se quiser capturar outras constraints específicas
    return res.status(400).json({ error: 'Foreign key constraint violation' });
  }

  // Erro genérico de banco
  return res.status(500).json({
    error: 'Internal error',
    details: error.message,
  });
}
