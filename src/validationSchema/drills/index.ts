import * as yup from 'yup';

export const drillValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  duration: yup.number().integer().required(),
  player_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
