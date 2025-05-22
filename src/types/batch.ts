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

export interface CreateBatchDTO {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  start_date: string;
  end_date: string;
}

export interface UpdateBatchDTO {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  start_date?: string;
  end_date?: string;
}

export interface BatchFilters {
  name?: string;
  priceMin?: number;
  priceMax?: number;
  startDateFrom?: string;
  startDateTo?: string;
}
