import { query } from '../config/database';

export interface Batch {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export async function getBatchesByEventId(eventId: string): Promise<Batch[]> {
  const sql = `
    SELECT * FROM batches
    WHERE event_id = $1
    ORDER BY start_date ASC
  `;
  const result = await query(sql, [eventId]);
  return result.rows;
}

export async function getBatchById(id: string): Promise<Batch | null> {
  const sql = 'SELECT * FROM batches WHERE id = $1';
  const result = await query(sql, [id]);
  return result.rows.length ? result.rows[0] : null;
}

export async function createBatch(
  eventId: string,
  data: Omit<Batch, 'id' | 'event_id' | 'created_at' | 'updated_at'>
): Promise<Batch> {
  const sql = `
    INSERT INTO batches (event_id, name, description, price, quantity, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    eventId,
    data.name,
    data.description || '',
    data.price,
    data.quantity,
    data.start_date,
    data.end_date,
  ];

  const result = await query(sql, values);
  return result.rows[0];
}

export async function updateBatch(
  id: string,
  data: Partial<Omit<Batch, 'id' | 'event_id' | 'created_at' | 'updated_at'>>
): Promise<Batch | null> {
  const sql = `
    UPDATE batches
    SET name = $1,
        description = $2,
        price = $3,
        quantity = $4,
        start_date = $5,
        end_date = $6,
        updated_at = NOW()
    WHERE id = $7
    RETURNING *;
  `;

  const values = [
    data.name,
    data.description || '',
    data.price,
    data.quantity,
    data.start_date,
    data.end_date,
    id,
  ];

  const result = await query(sql, values);
  return result.rows.length ? result.rows[0] : null;
}

export async function deleteBatch(id: string): Promise<boolean> {
  const sql = 'DELETE FROM batches WHERE id = $1';
  const result = await query(sql, [id]);
  return result.rowCount != null && result.rowCount > 0;
}
