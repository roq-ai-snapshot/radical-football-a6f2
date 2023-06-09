import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PerformanceMetricInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  name: string;
  value: number;
  unit: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  player?: PlayerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PerformanceMetricGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  name?: string;
  unit?: string;
}
