import { Router, Request, Response } from 'express';
import pool from '../config/database';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
  try {
    const startTime = Date.now();
    await pool.query('SELECT 1');
    const dbResponseTime = Date.now() - startTime;

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'connected',
          responseTime: `${dbResponseTime}ms`,
        },
        api: {
          status: 'running',
          uptime: process.uptime(),
          version: process.env.npm_package_version || '1.0.0',
        },
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: {
          status: 'disconnected',
          error: 'Failed to connect to database',
        },
        api: {
          status: 'running',
          uptime: process.uptime(),
        },
      },
    });
  }
});

export default router;
