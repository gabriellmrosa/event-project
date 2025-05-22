export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  location?: string;
  status: 'DRAFT' | 'PUBLISHED';
  created_at: string;
  updated_at: string;
}

export interface CreateEventDTO {
  name: string;
  description?: string;
  date: string;
  location?: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface UpdateEventDTO {
  name?: string;
  description?: string;
  date?: string;
  location?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

export interface EventFilters {
  name?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
