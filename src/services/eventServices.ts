import { query } from '../config/database';
import { QueryResult } from 'pg';

export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  location?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function createEvent(
  eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>
): Promise<Event> {
  const sql = `
    INSERT INTO events (name, description, date, location, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    eventData.name,
    eventData.description || '',
    eventData.date,
    eventData.location || '',
    eventData.status || 'DRAFT',
  ];

  const result = await query(sql, values);
  return result.rows[0] as Event;
}

export async function getAllEvents(): Promise<Event[]> {
  const sql = 'SELECT * FROM events ORDER BY date ASC';
  const result = await query(sql);
  return result.rows;
}

export async function getEventByIdFromDB(id: string): Promise<Event | null> {
  const sql = 'SELECT * FROM events WHERE id = $1';
  const result = await query(sql, [id]);
  return result.rows.length ? result.rows[0] : null;
}

export async function updateEventInDB(
  id: string,
  eventData: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>
): Promise<Event | null> {
  const sql = `
    UPDATE events
    SET name = $1,
        description = $2,
        date = $3,
        location = $4,
        status = $5,
        updated_at = NOW()
    WHERE id = $6
    RETURNING *;
  `;

  const values = [
    eventData.name,
    eventData.description || '',
    eventData.date,
    eventData.location || '',
    eventData.status || 'DRAFT',
    id,
  ];

  const result = await query(sql, values);
  return result.rows.length ? result.rows[0] : null;
}

export async function deleteEventFromDB(id: string): Promise<boolean> {
  const sql = 'DELETE FROM events WHERE id = $1';
  const result: QueryResult = await query(sql, [id]);
  return result.rowCount != null && result.rowCount > 0;
}
