-- Habilita a extensão uuid-ossp para geração de UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria tabela de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  date TIMESTAMP NOT NULL,
  location VARCHAR(255) DEFAULT '',
  status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
