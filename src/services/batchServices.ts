import pool from '../config/database';

export const getAllBatchesByEventService = async (eventId: string) => {
  const result = await pool.query('SELECT * FROM batches WHERE event_id = $1', [
    eventId,
  ]);
  return result.rows;
};

export const getSingleBatchService = async (
  eventId: string,
  batchId: string
) => {
  const result = await pool.query(
    'SELECT * FROM batches WHERE event_id = $1 AND id = $2',
    [eventId, batchId]
  );
  return result.rows[0];
};

export const createBatchService = async (eventId: string, data: any) => {
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
  data: any
) => {
  const { name, description, price, quantity, start_date, end_date } = data;

  const result = await pool.query(
    `UPDATE batches SET name = $1, description = $2, price = $3, quantity = $4, start_date = $5, end_date = $6
     WHERE event_id = $7 AND id = $8 RETURNING *`,
    [name, description, price, quantity, start_date, end_date, eventId, batchId]
  );

  return result.rows[0];
};

export const deleteBatchService = async (eventId: string, batchId: string) => {
  const result = await pool.query(
    'DELETE FROM batches WHERE event_id = $1 AND id = $2 RETURNING *',
    [eventId, batchId]
  );

  return result.rows[0];
};
