import * as yup from 'yup';

export const performanceMetricValidationSchema = yup.object().shape({
  name: yup.string().required(),
  value: yup.number().integer().required(),
  unit: yup.string().required(),
  player_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
