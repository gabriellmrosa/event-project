import app from './app';
import { Server } from 'http';

const port = process.env.PORT || 3000;

let server: Server | undefined;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

export { server };
