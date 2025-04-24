import pool from '../../database/database';

export const getAllEventsService = async () => {
  const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
  return result.rows;
};

export const getEventByIdService = async (eventId: number) => {
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId]);
  return result.rows[0];
};

export const createEventService = async (
  name: string,
  description: string,
  start_date: string,
  end_date: string,
  location: string,
  organizer: string,
  status: string
) => {
  const result = await pool.query(
    `INSERT INTO events (name, description, start_date, end_date, location, organizer, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, name, description, start_date, end_date, location, organizer, status, created_at, updated_at`,
    [name, description, start_date, end_date, location, organizer, status]
  );
  return result.rows[0];
};

export const updateEventService = async (
  eventId: number,
  name: string,
  description: string,
  start_date: string,
  end_date: string,
  location: string,
  organizer: string,
  status: string
) => {
  const result = await pool.query(
    `UPDATE events SET name = $1, description = $2, start_date = $3, end_date = $4,
     location = $5, organizer = $6, status = $7, updated_at = CURRENT_TIMESTAMP
     WHERE id = $8
     RETURNING id, name, description, start_date, end_date, location, organizer, status, created_at, updated_at`,
    [name, description, start_date, end_date, location, organizer, status, eventId]
  );
  return result.rows[0];
};

export const deleteEventService = async (eventId: number) => {
  const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING id', [eventId]);
  return result.rows[0];
};
