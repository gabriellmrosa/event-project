# 🎉 Evento Backend API

API REST para gerenciamento de eventos e vendas de ingressos em lotes, desenvolvida em Node.js com TypeScript.

## 🚀 Funcionalidades

### 📋 **Gerenciamento de Eventos**
- ✅ CRUD completo de eventos
- ✅ Filtros avançados (nome, status, período)
- ✅ Paginação automática
- ✅ Status: DRAFT ou PUBLISHED

### 🎫 **Gerenciamento de Lotes**
- ✅ CRUD completo de lotes vinculados a eventos
- ✅ Filtros por preço, nome e período
- ✅ Validação de datas (início < fim)
- ✅ Controle de preços e quantidades

### 🔒 **Segurança e Qualidade**
- ✅ Rate limiting (100 req/15min geral, 10 req/15min para modificações)
- ✅ Validação rigorosa com Zod
- ✅ CORS configurável
- ✅ Helmet para headers de segurança
- ✅ Error handling centralizado
- ✅ Logs estruturados

### 🛠 **Recursos Técnicos**
- ✅ TypeScript com tipagem completa
- ✅ Paginação automática com filtros
- ✅ Health check endpoint
- ✅ Graceful shutdown
- ✅ Ambiente de teste isolado
- ✅ Cobertura de testes abrangente

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 13+
- npm ou yarn

## 🔧 Instalação

```bash
# 1. Clone o repositório
git clone <repo-url>
cd evento-backend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações

# 4. Execute as migrações
npm run migrate

# 5. Execute os testes
npm test

# 6. Inicie o servidor
npm run dev
```

## 🌍 Variáveis de Ambiente

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=evento_db
DB_USER=postgres
DB_PASSWORD=password

# Server
PORT=3000
NODE_ENV=development

# CORS (opcional)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Debug (opcional)
DEBUG_TESTS=true
```

## 📚 **Documentação Automática**

### **Swagger/OpenAPI 3.0**
A API possui documentação automática gerada com Swagger. Acesse:

```
http://localhost:3000/api/docs
```

**Funcionalidades da Documentação:**
- ✅ **Exploração interativa** de todos os endpoints
- ✅ **Teste direto** das APIs no navegador
- ✅ **Schemas detalhados** com exemplos
- ✅ **Códigos de resposta** com descrições
- ✅ **Filtros e paginação** documentados
- ✅ **Validações** e regras de negócio explicadas

### **Interface Profissional:**
- 🎨 Interface limpa e intuitiva
- 🔍 Busca e filtros nos endpoints
- ⚡ Teste direto com dados reais
- 📱 Responsiva para mobile
- 🔧 Configurações personalizadas

## 📍 Endpoints da API

### 🔍 **Health Check**
```
GET /api/health
```

### 📋 **Eventos**

#### Listar eventos
```
GET /api/v1/events?page=1&limit=10&name=festa&status=PUBLISHED&dateFrom=2024-01-01&dateTo=2024-12-31
```

#### Buscar evento
```
GET /api/v1/events/:id
```

#### Criar evento
```
POST /api/v1/events
Content-Type: application/json

{
  "name": "Nome do Evento",
  "description": "Descrição opcional",
  "date": "2024-12-31T23:59:59.000Z",
  "location": "Local opcional",
  "status": "DRAFT"
}
```

#### Atualizar evento
```
PUT /api/v1/events/:id
Content-Type: application/json

{
  "name": "Novo Nome",
  "status": "PUBLISHED"
}
```

#### Deletar evento
```
DELETE /api/v1/events/:id
```

### 🎫 **Lotes**

#### Listar lotes do evento
```
GET /api/v1/events/:eventId/batches?page=1&limit=10&priceMin=50&priceMax=200&name=early
```

#### Buscar lote específico
```
GET /api/v1/events/:eventId/batches/:batchId
```

#### Criar lote
```
POST /api/v1/events/:eventId/batches
Content-Type: application/json

{
  "name": "Early Bird",
  "description": "Lote promocional",
  "price": 99.90,
  "quantity": 100,
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": "2024-02-01T00:00:00.000Z"
}
```

#### Atualizar lote
```
PUT /api/v1/events/:eventId/batches/:batchId
Content-Type: application/json

{
  "price": 149.90,
  "quantity": 150
}
```

#### Deletar lote
```
DELETE /api/v1/events/:eventId/batches/:batchId
```

## 📊 **Estrutura de Resposta**

### Resposta com Paginação
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Resposta de Erro
```json
{
  "message": "Descrição do erro",
  "errors": [
    {
      "campo": "name",
      "mensagem": "Nome é obrigatório"
    }
  ]
}
```

### Health Check
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "services": {
    "database": {
      "status": "connected",
      "responseTime": "15ms"
    },
    "api": {
      "status": "running",
      "uptime": 3600,
      "version": "1.0.0"
    }
  }
}
```

## 🧪 **Testes**

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Debug de testes (mostra respostas)
DEBUG_TESTS=true npm test
```

### Cobertura de Testes
- ✅ Eventos: CRUD + filtros + paginação + validações
- ✅ Lotes: CRUD + filtros + paginação + validações  
- ✅ Rate limiting
- ✅ Validação de UUIDs
- ✅ Error handling
- ✅ Casos de borda

## 📁 **Estrutura do Projeto**

```
src/
├── config/           # Configurações (DB, env)
├── controllers/      # Controllers da API
├── middlewares/      # Middlewares customizados
├── routes/          # Definição das rotas
├── schemas/         # Schemas de validação Zod
├── services/        # Lógica de negócio
├── types/           # Interfaces TypeScript
├── utils/           # Utilitários
├── migrations/      # Migrações do banco
├── scripts/         # Scripts auxiliares
└── app.ts          # Configuração do Express

tests/
├── events/         # Testes de eventos
├── batches/        # Testes de lotes
└── utils/          # Mocks e helpers de teste
```

## 🔄 **Scripts Disponíveis**

```bash
npm run dev         # Servidor em desenvolvimento
npm run build       # Build para produção
npm start           # Servidor em produção
npm test            # Executar testes
npm run test:watch  # Testes em modo watch
npm run migrate     # Executar migrações
```

## 🚀 **Deploy**

### Variáveis de Ambiente - Produção
```env
NODE_ENV=production
DB_HOST=seu-host-producao
DB_PORT=5432
DB_NAME=evento_db_prod
DB_USER=usuario_prod
DB_PASSWORD=senha_segura
PORT=80
ALLOWED_ORIGINS=https://seudominio.com,https://app.seudominio.com
```

### Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 **Licença**

Este projeto está sob a licença MIT.

## 🔧 **Troubleshooting**

### Problemas Comuns

**Erro de conexão com banco:**
```bash
# Verifique se o PostgreSQL está rodando
sudo systemctl status postgresql

# Teste a conexão
psql -h localhost -U postgres -d evento_db
```

**Testes falhando:**
```bash
# Rode com debug ativado
DEBUG_TESTS=true npm test

# Verifique as variáveis de ambiente
echo $NODE_ENV
```

**Rate limiting nos testes:**
```bash
# Aguarde 15 minutos ou reinicie o servidor
npm run dev
```

## 📞 **Suporte**

Para dúvidas ou problemas:
1. Consulte a documentação
2. Verifique os logs do servidor
3. Execute os testes para identificar regressões
4. Abra uma issue no repositório

---

**Desenvolvido com ❤️ usando Node.js + TypeScript + PostgreSQL**