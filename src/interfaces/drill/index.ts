import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DrillInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  name: string;
  description?: string;
  duration: number;
  created_at?: Date | string;
  updated_at?: Date | string;

  player?: PlayerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface DrillGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  name?: string;
  description?: string;
}
