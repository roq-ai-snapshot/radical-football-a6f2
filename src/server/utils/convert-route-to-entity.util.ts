const mapping: Record<string, string> = {
  academies: 'academy',
  drills: 'drill',
  'performance-metrics': 'performance_metric',
  players: 'player',
  'training-sessions': 'training_session',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
