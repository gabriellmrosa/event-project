import pool from '../config/database';
import { Batch, CreateBatchDTO, UpdateBatchDTO, BatchFilters } from '../types/batch';

export const getAllBatchesByEventService = async (
  eventId: string,
  limit: number = 10,
  offset: number = 0
): Promise<Batch[]> => {
  const result = await pool.query(
    'SELECT * FROM batches WHERE event_id = $1 ORDER BY start_date ASC LIMIT $2 OFFSET $3',
    [eventId, limit, offset]
  );
  return result.rows;
};

export const getTotalBatchesCountService = async (
  eventId: string,
  filters?: BatchFilters
): Promise<number> => {
  let query = 'SELECT COUNT(*) FROM batches WHERE event_id = $1';
  const params: any[] = [eventId];

  if (filters?.name) {
    query += ` AND name ILIKE $${params.length + 1}`;
    params.push(`%${filters.name}%`);
  }

  if (filters?.priceMin !== undefined) {
    query += ` AND price >= $${params.length + 1}`;
    params.push(filters.priceMin);
  }

  if (filters?.priceMax !== undefined) {
    query += ` AND price <= $${params.length + 1}`;
    params.push(filters.priceMax);
  }

  if (filters?.startDateFrom) {
    query += ` AND start_date >= $${params.length + 1}`;
    params.push(filters.startDateFrom);
  }

  if (filters?.startDateTo) {
    query += ` AND start_date <= $${params.length + 1}`;
    params.push(filters.startDateTo);
  }

  const result = await pool.query(query, params);
  return parseInt(result.rows[0].count);
};

export const searchBatchesService = async (
  eventId: string,
  filters: BatchFilters,
  limit: number = 10,
  offset: number = 0
): Promise<Batch[]> => {
  let query = 'SELECT * FROM batches WHERE event_id = $1';
  const params: any[] = [eventId];

  if (filters.name) {
    query += ` AND name ILIKE $${params.length + 1}`;
    params.push(`%${filters.name}%`);
  }

  if (filters.priceMin !== undefined) {
    query += ` AND price >= $${params.length + 1}`;
    params.push(filters.priceMin);
  }

  if (filters.priceMax !== undefined) {
    query += ` AND price <= $${params.length + 1}`;
    params.push(filters.priceMax);
  }

  if (filters.startDateFrom) {
    query += ` AND start_date >= $${params.length + 1}`;
    params.push(filters.startDateFrom);
  }

  if (filters.startDateTo) {
    query += ` AND start_date <= $${params.length + 1}`;
    params.push(filters.startDateTo);
  }

  query += ` ORDER BY start_date ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  return result.rows;
};

export const getSingleBatchService = async (
  eventId: string,
  batchId: string
): Promise<Batch | null> => {
  const result = await pool.query(
    'SELECT * FROM batches WHERE event_id = $1 AND id = $2',
    [eventId, batchId]
  );
  return result.rows[0] || null;
};

export const createBatchService = async (eventId: string, data: CreateBatchDTO): Promise<Batch> => {
  const { name, description, price, quantity, start_date, end_date } = data;

  const result = await pool.query(
    `INSERT INTO batches (event_id, name, description, price, quantity, start_date, end_date) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [eventId, name, description, price, quantity, start_date, end_date]
  );

  return result.rows[0];
};

export const updateBatchService = async (
  eventId: string,
  batchId: string,
  data: UpdateBatchDTO
): Promise<Batch | null> => {
  const updates: string[] = [];
  const values: any[] = [eventId, batchId];
  let paramCount = 3;

  if (data.name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(data.name);
  }

  if (data.description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(data.description);
  }

  if (data.price !== undefined) {
    updates.push(`price = $${paramCount++}`);
    values.push(data.price);
  }

  if (data.quantity !== undefined) {
    updates.push(`quantity = $${paramCount++}`);
    values.push(data.quantity);
  }

  if (data.start_date !== undefined) {
    updates.push(`start_date = $${paramCount++}`);
    values.push(data.start_date);
  }

  if (data.end_date !== undefined) {
    updates.push(`end_date = $${paramCount++}`);
    values.push(data.end_date);
  }

  if (updates.length === 0) {
    throw new Error('Nenhum campo para atualizar');
  }

  updates.push(`updated_at = NOW()`);

  const query = `UPDATE batches SET ${updates.join(', ')} WHERE event_id = $1 AND id = $2 RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

export const deleteBatchService = async (eventId: string, batchId: string): Promise<Batch | null> => {
  const result = await pool.query(
    'DELETE FROM batches WHERE event_id = $1 AND id = $2 RETURNING *',
    [eventId, batchId]
  );

  return result.rows[0] || null;
};
