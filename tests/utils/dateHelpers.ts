export function getFutureDates() {
    const now = new Date();
    const nextDay = new Date(now);
    const nextMonth = new Date(now);
  
    nextDay.setDate(now.getDate() + 1);
    nextMonth.setMonth(now.getMonth() + 1);
  
    return {
      now: now.toISOString(),
      nextDay: nextDay.toISOString(),
      nextMonth: nextMonth.toISOString(),
    };
  }
  