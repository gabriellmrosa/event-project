# 📚 Guia da Documentação Swagger - Evento API

## 🚀 Como Acessar

1. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

2. **Abra no navegador:**
   ```
   http://localhost:3000/api/docs
   ```

## 🎯 Funcionalidades da Documentação

### **📖 Exploração de Endpoints**
- **3 categorias organizadas:**
  - 🩺 **Health** - Status da API
  - 📅 **Events** - Gerenciamento de eventos  
  - 🎫 **Batches** - Gerenciamento de lotes

### **⚡ Teste Interativo**
1. **Clique em qualquer endpoint**
2. **Clique em "Try it out"**
3. **Preencha os parâmetros**
4. **Clique em "Execute"**
5. **Veja a resposta em tempo real!**

### **📋 Schemas Detalhados**
- **Models** com todos os campos explicados
- **Exemplos realistas** para cada schema
- **Validações** e regras de negócio
- **Tipos de dados** e formatos

## 🔍 **Exemplos de Uso**

### **1. Criar um Evento**
```json
{
  "name": "Festa de Ano Novo 2024",
  "description": "Uma festa incrível para celebrar o ano novo",
  "date": "2024-12-31T23:00:00.000Z",
  "location": "Centro de Convenções - São Paulo/SP",
  "status": "DRAFT"
}
```

### **2. Listar Eventos com Filtros**
**Parâmetros de query:**
- `page=1`
- `limit=10`
- `name=festa`
- `status=PUBLISHED`
- `dateFrom=2024-01-01T00:00:00.000Z`
- `dateTo=2024-12-31T23:59:59.000Z`

### **3. Criar um Lote**
```json
{
  "name": "Early Bird",
  "description": "Lote promocional com desconto especial",
  "price": 99.90,
  "quantity": 100,
  "start_date": "2024-01-01T00:00:00.000Z",
  "end_date": "2024-02-01T23:59:59.000Z"
}
```

## 💡 **Dicas Importantes**

### **🔒 Rate Limiting**
- **Consultas (GET):** 100 requests/15min
- **Modificações (POST/PUT/DELETE):** 10 requests/15min
- Se exceder, aguarde 15 minutos

### **📋 Paginação**
- **Padrão:** `page=1`, `limit=10`
- **Máximo:** `limit=100`
- **Resposta sempre inclui:** `data` + `pagination`

### **🔍 UUIDs**
- Todos os IDs são UUIDs v4
- **Formato:** `123e4567-e89b-12d3-a456-426614174000`
- Validação automática em todas as rotas

### **📅 Datas**
- **Formato obrigatório:** ISO 8601
- **Exemplo:** `2024-12-31T23:59:59.000Z`
- **Timezone:** UTC recomendado

## 🎨 **Interface Features**

### **🔧 Configurações Avançadas**
- **Persistir autorização** (quando implementada)
- **Mostrar duração** das requests
- **Headers customizados**
- **Filtro de endpoints**

### **📱 Mobile Friendly**
- Interface responsiva
- Funciona perfeitamente no celular
- Toque para expandir/contrair seções

### **🎯 Navegação Rápida**
- **Tags organizadas** por funcionalidade
- **Busca instantânea** nos endpoints
- **Expansão/contração** de seções
- **Links diretos** para schemas

## 🚀 **Cenários de Teste**

### **Cenário 1: Criar Evento Completo**
1. **POST** `/events` - Criar evento
2. **GET** `/events` - Listar para ver o criado
3. **GET** `/events/{id}` - Buscar específico
4. **PUT** `/events/{id}` - Atualizar status para PUBLISHED

### **Cenário 2: Gerenciar Lotes**
1. **POST** `/events/{eventId}/batches` - Criar lote Early Bird
2. **POST** `/events/{eventId}/batches` - Criar lote Regular
3. **GET** `/events/{eventId}/batches` - Listar todos
4. **PUT** `/events/{eventId}/batches/{batchId}` - Ajustar preço

### **Cenário 3: Filtros Avançados**
1. **GET** `/events?status=PUBLISHED&dateFrom=2024-01-01`
2. **GET** `/events/{eventId}/batches?priceMin=50&priceMax=150`
3. **GET** `/events?name=festa&page=2&limit=5`

## 🛠️ **Troubleshooting**

### **❌ Erro 400 - Bad Request**
- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme formato das datas (ISO 8601)
- Valide UUIDs nos parâmetros de path

### **❌ Erro 404 - Not Found**
- Confirme se o ID existe
- Para lotes, verifique se o evento existe
- Use GET para listar e confirmar IDs válidos

### **❌ Erro 429 - Too Many Requests**
- Aguarde 15 minutos
- Use rate limit menos restritivo (GET vs POST/PUT/DELETE)

### **❌ Erro 500 - Internal Server Error**
- Verifique se o servidor está rodando
- Confirme conexão com banco de dados via `/health`
- Verifique logs do servidor

## 🎉 **Vantagens da Documentação**

### **Para Desenvolvedores:**
- ⚡ **Teste rápido** sem Postman/Insomnia
- 📚 **Referência completa** sempre atualizada
- 🔍 **Exploração intuitiva** da API
- 🧪 **Validação** de integração

### **Para Stakeholders:**
- 👀 **Visualização clara** das funcionalidades
- 📊 **Compreensão** dos dados e fluxos
- 🎯 **Validação** de requisitos
- 📋 **Documentação viva** sempre atual

### **Para QA/Testing:**
- 🧪 **Cenários de teste** prontos
- 🔄 **Casos de borda** documentados
- ✅ **Validação** de contratos
- 📈 **Cobertura** completa de endpoints

---

**🎯 A documentação Swagger transforma sua API em uma ferramenta auto-explicativa e testável!**

**👨‍💻 Desenvolvido com carinho usando OpenAPI 3.0 + Swagger UI**