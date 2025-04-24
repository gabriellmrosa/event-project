import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType('event_status', ['DRAFT', 'ACTIVE', 'CANCELLED']);

  pgm.alterColumn('events', 'status', {
    type: 'event_status',
    using: "status::event_status",
  });

  pgm.createIndex('events', ['status']);
  pgm.createIndex('lotes', ['event_id']);
};
