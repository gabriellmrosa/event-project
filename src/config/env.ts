import { z } from 'zod';

const isTestEnv = process.env.NODE_ENV === 'test';

const envSchema = z.object({
  DB_HOST: z.string().min(1, 'DB_HOST é obrigatório').default(isTestEnv ? 'localhost' : ''),
  DB_PORT: z.string().transform((val) => {
    if (!val && isTestEnv) return 5432;
    const port = Number(val);
    if (isNaN(port) || port <= 0 || port > 65535) {
      if (isTestEnv) return 5432;
      throw new Error('DB_PORT deve ser um número válido entre 1 e 65535');
    }
    return port;
  }).default(isTestEnv ? '5432' : ''),
  DB_NAME: z.string().min(1, 'DB_NAME é obrigatório').default(isTestEnv ? 'test_db' : ''),
  DB_USER: z.string().min(1, 'DB_USER é obrigatório').default(isTestEnv ? 'test_user' : ''),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD é obrigatório').default(isTestEnv ? 'test_password' : ''),
  PORT: z.string().transform((val) => {
    const port = Number(val);
    if (isNaN(port) || port <= 0 || port > 65535) {
      return 3000;
    }
    return port;
  }).default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (!isTestEnv) {
    console.error('❌ Erro nas variáveis de ambiente:');
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  } else {
    // Em ambiente de teste, usar valores padrão
    env = {
      DB_HOST: 'localhost',
      DB_PORT: 5432,
      DB_NAME: 'test_db',
      DB_USER: 'test_user',
      DB_PASSWORD: 'test_password',
      PORT: 3000,
      NODE_ENV: 'test' as const,
    };
  }
}

export { env };
