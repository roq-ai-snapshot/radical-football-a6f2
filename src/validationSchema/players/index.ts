import * as yup from 'yup';
import { drillValidationSchema } from 'validationSchema/drills';
import { performanceMetricValidationSchema } from 'validationSchema/performance-metrics';
import { trainingSessionValidationSchema } from 'validationSchema/training-sessions';

export const playerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  academy_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
  drill: yup.array().of(drillValidationSchema),
  performance_metric: yup.array().of(performanceMetricValidationSchema),
  training_session: yup.array().of(trainingSessionValidationSchema),
});
