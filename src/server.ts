import app from './index';

const port = parseInt(process.env.PORT || '3333');

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
