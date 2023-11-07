import {FansListItem} from './FansListItem';

export interface FansListResponse {
  count: number;
  next: string | null;
  previos: string | null;
  results: FansListItem[];
}
