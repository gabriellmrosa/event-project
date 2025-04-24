import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('events', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'text' },
    location: { type: 'varchar(255)' },
    organizer: { type: 'varchar(255)' }, // 👈 adiciona aqui
    status: { type: 'varchar(50)', notNull: true },
    start_date: { type: 'timestamp', notNull: true },
    end_date: { type: 'timestamp', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  pgm.createTable('lotes', {
    id: 'id',
    event_id: {
      type: 'integer',
      references: 'events',
      notNull: true,
      onDelete: 'CASCADE',
    },
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'text' },
    attractions: { type: 'text[]' },
    more_info: { type: 'text' },
    capacity: { type: 'integer', notNull: true },
    price: { type: 'numeric(10, 2)', notNull: true },
    batch_number: { type: 'integer', notNull: true },
    start_sale_date: { type: 'timestamp', notNull: true },
    end_sale_date: { type: 'timestamp', notNull: true },
    status: { type: 'varchar(50)', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('lotes');
  pgm.dropTable('events');
};
