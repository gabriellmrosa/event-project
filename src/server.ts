import app from './app';
import { Server } from 'http';
import { env } from './config/env';

let server: Server | undefined;

if (env.NODE_ENV !== 'test') {
  server = app.listen(env.PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${env.PORT}`);
    console.log(`📋 Health check: http://localhost:${env.PORT}/api/health`);
    console.log(`📖 API Base: http://localhost:${env.PORT}/api/v1`);
    console.log(`🌍 Ambiente: ${env.NODE_ENV}`);
  });

  const gracefulShutdown = (signal: string) => {
    console.log(`\n${signal} recebido. Encerrando servidor...`);
    if (server) {
      server.close(() => {
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
      });
    }
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

export { server };
