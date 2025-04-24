export function getFutureDates() {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1);

  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);

  return {
    now: now.toISOString(),
    nextDay: nextDay.toISOString(),
    nextMonth: nextMonth.toISOString(),
  };
}

export function getValidEventData(now: string, nextDay: string) {
  return {
    name: 'Evento Teste',
    description: 'Descrição válida',
    start_date: now,
    end_date: nextDay,
    location: 'Local de teste',
    organizer: 'Organizador',
    status: 'DRAFT',
  };
}

export function getValidLoteData(now: string, nextMonth: string, eventId?: number) {
  return {
    name: 'Lote 1',
    description: 'Primeiro lote',
    attractions: ["DJ Teste", "Luzes", "Efeitos"],
    more_info: 'Chegue cedo!',
    capacity: 100,
    price: 50.0,
    batch_number: 1,
    start_sale_date: now,
    end_sale_date: nextMonth,
    status: 'ACTIVE',
    ...(eventId && { event_id: eventId }),
  };
}
