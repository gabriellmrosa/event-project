import pool from '../config/database';

export const getAllEventsService = async () => {
  const result = await pool.query('SELECT * FROM events');
  return result.rows;
};

export const getSingleEventService = async (id: string) => {
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0];
};

export const createEventService = async (data: any) => {
  const { name, description, date, location, status } = data;

  const result = await pool.query(
    'INSERT INTO events (name, description, date, location, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, description, date, location, status]
  );

  return result.rows[0];
};

export const updateEventService = async (id: string, data: any) => {
  const { name, description, date, location, status } = data;

  const result = await pool.query(
    'UPDATE events SET name = $1, description = $2, date = $3, location = $4, status = $5 WHERE id = $6 RETURNING *',
    [name, description, date, location, status, id]
  );

  return result.rows[0];
};

export const deleteEventService = async (id: string) => {
  const result = await pool.query(
    'DELETE FROM events WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
