import pool from '../config/database';
import { Event, CreateEventDTO, UpdateEventDTO, EventFilters } from '../types/event';

export const getAllEventsService = async (
  limit: number = 10,
  offset: number = 0
): Promise<Event[]> => {
  const result = await pool.query(
    'SELECT * FROM events ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  return result.rows;
};

export const getTotalEventsCountService = async (filters?: EventFilters): Promise<number> => {
  let query = 'SELECT COUNT(*) FROM events WHERE 1=1';
  const params: any[] = [];

  if (filters?.name) {
    query += ` AND name ILIKE $${params.length + 1}`;
    params.push(`%${filters.name}%`);
  }

  if (filters?.status) {
    query += ` AND status = $${params.length + 1}`;
    params.push(filters.status);
  }

  if (filters?.dateFrom) {
    query += ` AND date >= $${params.length + 1}`;
    params.push(filters.dateFrom);
  }

  if (filters?.dateTo) {
    query += ` AND date <= $${params.length + 1}`;
    params.push(filters.dateTo);
  }

  const result = await pool.query(query, params);
  return parseInt(result.rows[0].count);
};

export const searchEventsService = async (
  filters: EventFilters,
  limit: number = 10,
  offset: number = 0
): Promise<Event[]> => {
  let query = 'SELECT * FROM events WHERE 1=1';
  const params: any[] = [];

  if (filters.name) {
    query += ` AND name ILIKE $${params.length + 1}`;
    params.push(`%${filters.name}%`);
  }

  if (filters.status) {
    query += ` AND status = $${params.length + 1}`;
    params.push(filters.status);
  }

  if (filters.dateFrom) {
    query += ` AND date >= $${params.length + 1}`;
    params.push(filters.dateFrom);
  }

  if (filters.dateTo) {
    query += ` AND date <= $${params.length + 1}`;
    params.push(filters.dateTo);
  }

  query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  return result.rows;
};

export const getSingleEventService = async (id: string): Promise<Event | null> => {
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const createEventService = async (data: CreateEventDTO): Promise<Event> => {
  const { name, description, date, location, status } = data;

  const result = await pool.query(
    'INSERT INTO events (name, description, date, location, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, description, date, location, status]
  );

  return result.rows[0];
};

export const updateEventService = async (id: string, data: UpdateEventDTO): Promise<Event | null> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(data.name);
  }

  if (data.description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(data.description);
  }

  if (data.date !== undefined) {
    updates.push(`date = $${paramCount++}`);
    values.push(data.date);
  }

  if (data.location !== undefined) {
    updates.push(`location = $${paramCount++}`);
    values.push(data.location);
  }

  if (data.status !== undefined) {
    updates.push(`status = $${paramCount++}`);
    values.push(data.status);
  }

  if (updates.length === 0) {
    throw new Error('Nenhum campo para atualizar');
  }

  updates.push(`updated_at = NOW()`);
  values.push(id);

  const query = `UPDATE events SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
  
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

export const deleteEventService = async (id: string): Promise<Event | null> => {
  const result = await pool.query(
    'DELETE FROM events WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0] || null;
};
