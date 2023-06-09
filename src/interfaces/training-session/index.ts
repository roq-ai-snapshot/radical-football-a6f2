import { PlayerInterface } from 'interfaces/player';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TrainingSessionInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  date: Date | string;
  duration: number;
  location: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  player?: PlayerInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TrainingSessionGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  location?: string;
}
