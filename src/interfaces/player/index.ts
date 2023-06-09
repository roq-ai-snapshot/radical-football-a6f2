import { DrillInterface } from 'interfaces/drill';
import { PerformanceMetricInterface } from 'interfaces/performance-metric';
import { TrainingSessionInterface } from 'interfaces/training-session';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  coach_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  drill?: DrillInterface[];
  performance_metric?: PerformanceMetricInterface[];
  training_session?: TrainingSessionInterface[];
  user_player_user_idTouser?: UserInterface;
  academy?: AcademyInterface;
  user_player_coach_idTouser?: UserInterface;
  _count?: {
    drill?: number;
    performance_metric?: number;
    training_session?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  academy_id?: string;
  coach_id?: string;
}
