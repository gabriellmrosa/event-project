import pool from '../../database/database';

export const getLotesByEventService = async (eventId: number) => {
  const result = await pool.query(
    'SELECT * FROM lotes WHERE event_id = $1 ORDER BY batch_number ASC',
    [eventId]
  );
  return result.rows;
};

export const getLoteByIdService = async (loteId: number) => {
  const result = await pool.query('SELECT * FROM lotes WHERE id = $1', [loteId]);
  return result.rows[0];
};

export const createLoteService = async (eventId: number, data: any) => {
  const {
    name,
    description,
    attractions,
    more_info,
    capacity,
    price,
    batch_number,
    start_sale_date,
    end_sale_date,
    status,
  } = data;

  const result = await pool.query(
    `INSERT INTO lotes (
      event_id, name, description, attractions, more_info, capacity, price, batch_number,
      start_sale_date, end_sale_date, status
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    ) RETURNING *`,
    [
      eventId,
      name,
      description,
      attractions ? `{${attractions.join(',')}}` : null, // 👈 Aqui!
      more_info,
      capacity,
      price,
      batch_number,
      start_sale_date,
      end_sale_date,
      status,
    ]
  );  

  return result.rows[0];
};


export const updateLoteService = async (
  loteId: number,
  lote: {
    name: string;
    description: string;
    attractions: string[];
    more_info: string;
    capacity: number;
    price: number;
    status: string;
    batch_number: number;
    start_sale_date: string;
    end_sale_date: string;
  }
) => {
  const {
    name,
    description,
    attractions,
    more_info,
    capacity,
    price,
    status,
    batch_number,
    start_sale_date,
    end_sale_date,
  } = lote;

  const result = await pool.query(
    `UPDATE lotes SET name = $1, description = $2, attractions = $3, more_info = $4,
     capacity = $5, price = $6, status = $7, batch_number = $8,
     start_sale_date = $9, end_sale_date = $10, updated_at = CURRENT_TIMESTAMP
     WHERE id = $11
     RETURNING id, event_id, name, description, attractions, more_info, capacity, price, status, batch_number, start_sale_date, end_sale_date, created_at, updated_at`,
    [
      name,
      description,
      attractions,
      more_info,
      capacity,
      price,
      status,
      batch_number,
      start_sale_date,
      end_sale_date,
      loteId,
    ]
  );

  return result.rows[0];
};


export const deleteLoteService = async (loteId: number) => {
  const result = await pool.query('DELETE FROM lotes WHERE id = $1 RETURNING id', [loteId]);
  return result.rows[0];
};
