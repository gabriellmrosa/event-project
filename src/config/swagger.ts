import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Evento Backend API',
      version: '1.0.0',
      description: `
API REST para gerenciamento de eventos e vendas de ingressos em lotes.

## 🚀 Funcionalidades

- **Gerenciamento de Eventos**: CRUD completo com filtros avançados
- **Gerenciamento de Lotes**: Sistema de venda por períodos
- **Paginação**: Automática em todas as listagens  
- **Segurança**: Rate limiting, validação rigorosa
- **Health Check**: Monitoramento de status da API

## 🔒 Segurança

- Rate limiting: 100 req/15min (geral), 10 req/15min (modificações)
- Validação robusta com Zod
- CORS configurável por ambiente
- Headers de segurança com Helmet

## 📋 Estrutura de Resposta

### Paginação
Todas as listagens retornam:
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
\`\`\`

### Erros
\`\`\`json
{
  "message": "Descrição do erro",
  "errors": [
    {
      "campo": "name",
      "mensagem": "Nome é obrigatório"
    }
  ]
}
\`\`\`
      `,
      contact: {
        name: 'API Support',
        email: 'support@yourcompany.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://your-api-domain.com/api/v1',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      schemas: {
        Event: {
          type: 'object',
          required: ['name', 'date', 'status'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do evento',
              example: '123e4567-e89b-12d3-a456-426614174000'
            },
            name: {
              type: 'string',
              description: 'Nome do evento',
              example: 'Festa de Ano Novo 2024'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Descrição detalhada do evento',
              example: 'Uma festa incrível para celebrar o ano novo com muita música e diversão'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora do evento em formato ISO 8601',
              example: '2024-12-31T23:00:00.000Z'
            },
            location: {
              type: 'string',
              nullable: true,
              description: 'Local onde o evento será realizado',
              example: 'Centro de Convenções - São Paulo/SP'
            },
            status: {
              type: 'string',
              enum: ['DRAFT', 'PUBLISHED'],
              description: 'Status atual do evento',
              example: 'PUBLISHED'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do evento',
              example: '2024-01-01T10:00:00.000Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2024-01-15T14:30:00.000Z'
            }
          }
        },
        CreateEvent: {
          type: 'object',
          required: ['name', 'date', 'status'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do evento',
              example: 'Festa de Ano Novo 2024'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do evento',
              example: 'Uma festa incrível para celebrar o ano novo'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora do evento em formato ISO 8601',
              example: '2024-12-31T23:00:00.000Z'
            },
            location: {
              type: 'string',
              description: 'Local onde o evento será realizado',
              example: 'Centro de Convenções - São Paulo/SP'
            },
            status: {
              type: 'string',
              enum: ['DRAFT', 'PUBLISHED'],
              description: 'Status inicial do evento',
              example: 'DRAFT'
            }
          }
        },
        UpdateEvent: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Novo nome do evento',
              example: 'Festa de Réveillon 2024 - ATUALIZADA'
            },
            description: {
              type: 'string',
              description: 'Nova descrição do evento',
              example: 'Festa atualizada com mais atrações'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Nova data do evento',
              example: '2024-12-31T22:00:00.000Z'
            },
            location: {
              type: 'string',
              description: 'Novo local do evento',
              example: 'Novo Local - Rio de Janeiro/RJ'
            },
            status: {
              type: 'string',
              enum: ['DRAFT', 'PUBLISHED'],
              description: 'Novo status do evento',
              example: 'PUBLISHED'
            }
          }
        },
        Batch: {
          type: 'object',
          required: ['name', 'price', 'quantity', 'start_date', 'end_date'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do lote',
              example: '456e7890-f12b-34c5-d678-901234567890'
            },
            event_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do evento ao qual o lote pertence',
              example: '123e4567-e89b-12d3-a456-426614174000'
            },
            name: {
              type: 'string',
              description: 'Nome do lote',
              example: 'Early Bird'
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Descrição do lote',
              example: 'Lote promocional com desconto especial'
            },
            price: {
              type: 'number',
              format: 'decimal',
              minimum: 0.01,
              description: 'Preço unitário do ingresso no lote',
              example: 99.90
            },
            quantity: {
              type: 'integer',
              minimum: 1,
              description: 'Quantidade de ingressos disponíveis no lote',
              example: 100
            },
            start_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de início da venda do lote',
              example: '2024-01-01T00:00:00.000Z'
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de fim da venda do lote',
              example: '2024-02-01T23:59:59.000Z'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do lote',
              example: '2024-01-01T10:00:00.000Z'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2024-01-15T14:30:00.000Z'
            }
          }
        },
        CreateBatch: {
          type: 'object',
          required: ['name', 'price', 'quantity', 'start_date', 'end_date'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do lote',
              example: 'Early Bird'
            },
            description: {
              type: 'string',
              description: 'Descrição do lote',
              example: 'Lote promocional com desconto especial'
            },
            price: {
              type: 'number',
              format: 'decimal',
              minimum: 0.01,
              description: 'Preço unitário do ingresso',
              example: 99.90
            },
            quantity: {
              type: 'integer',
              minimum: 1,
              description: 'Quantidade de ingressos disponíveis',
              example: 100
            },
            start_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de início da venda (deve ser anterior à end_date)',
              example: '2024-01-01T00:00:00.000Z'
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de fim da venda (deve ser posterior à start_date)',
              example: '2024-02-01T23:59:59.000Z'
            }
          }
        },
        UpdateBatch: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Novo nome do lote',
              example: 'Super Early Bird'
            },
            description: {
              type: 'string',
              description: 'Nova descrição do lote',
              example: 'Lote super promocional atualizado'
            },
            price: {
              type: 'number',
              format: 'decimal',
              minimum: 0.01,
              description: 'Novo preço unitário',
              example: 149.90
            },
            quantity: {
              type: 'integer',
              minimum: 1,
              description: 'Nova quantidade disponível',
              example: 150
            },
            start_date: {
              type: 'string',
              format: 'date-time',
              description: 'Nova data de início da venda',
              example: '2024-01-01T00:00:00.000Z'
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              description: 'Nova data de fim da venda',
              example: '2024-02-15T23:59:59.000Z'
            }
          }
        },
        PaginatedEvents: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Event'
              },
              description: 'Lista de eventos da página atual'
            },
            pagination: {
              $ref: '#/components/schemas/Pagination'
            }
          }
        },
        PaginatedBatches: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Batch'
              },
              description: 'Lista de lotes da página atual'
            },
            pagination: {
              $ref: '#/components/schemas/Pagination'
            }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              minimum: 1,
              description: 'Página atual',
              example: 1
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              description: 'Número de itens por página',
              example: 10
            },
            total: {
              type: 'integer',
              minimum: 0,
              description: 'Total de itens disponíveis',
              example: 50
            },
            pages: {
              type: 'integer',
              minimum: 0,
              description: 'Total de páginas disponíveis',
              example: 5
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Dados de entrada inválidos'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  campo: {
                    type: 'string',
                    description: 'Campo que causou o erro',
                    example: 'name'
                  },
                  mensagem: {
                    type: 'string',
                    description: 'Descrição específica do erro',
                    example: 'Nome é obrigatório'
                  }
                }
              },
              description: 'Lista detalhada de erros de validação'
            }
          }
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['healthy', 'unhealthy'],
              description: 'Status geral da API',
              example: 'healthy'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp da verificação',
              example: '2024-01-01T12:00:00.000Z'
            },
            services: {
              type: 'object',
              properties: {
                database: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      enum: ['connected', 'disconnected'],
                      example: 'connected'
                    },
                    responseTime: {
                      type: 'string',
                      description: 'Tempo de resposta do banco',
                      example: '15ms'
                    }
                  }
                },
                api: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'running'
                    },
                    uptime: {
                      type: 'number',
                      description: 'Tempo de atividade em segundos',
                      example: 3600
                    },
                    version: {
                      type: 'string',
                      description: 'Versão da API',
                      example: '1.0.0'
                    }
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Dados de entrada inválidos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        NotFound: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Evento não encontrado'
                  }
                }
              }
            }
          }
        },
        InternalServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Erro interno do servidor'
                  }
                }
              }
            }
          }
        },
        TooManyRequests: {
          description: 'Muitas tentativas - Rate limit excedido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Muitas tentativas. Tente novamente em 15 minutos.'
                  }
                }
              }
            }
          }
        }
      },
      parameters: {
        EventId: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID único do evento (UUID)',
          schema: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        },
        EventIdForBatch: {
          name: 'eventId',
          in: 'path',
          required: true,
          description: 'ID único do evento (UUID)',
          schema: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000'
          }
        },
        BatchId: {
          name: 'batchId',
          in: 'path',
          required: true,
          description: 'ID único do lote (UUID)',
          schema: {
            type: 'string',
            format: 'uuid',
            example: '456e7890-f12b-34c5-d678-901234567890'
          }
        },
        Page: {
          name: 'page',
          in: 'query',
          description: 'Número da página (mínimo 1)',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1,
            example: 1
          }
        },
        Limit: {
          name: 'limit',
          in: 'query',
          description: 'Número de itens por página (máximo 100)',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 10,
            example: 10
          }
        }
      }
    },
    tags: [
      {
        name: 'Health',
        description: 'Verificação de status da API'
      },
      {
        name: 'Events',
        description: 'Operações relacionadas a eventos'
      },
      {
        name: 'Batches',
        description: 'Operações relacionadas a lotes de ingressos'
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Caminhos para os arquivos com comentários Swagger
};

export const swaggerSpec = swaggerJsdoc(options);
