export type Alarm = {
  id: string;
  name: string;
  source: string;
  metric: string;
  trigger: string;
  paused: boolean;
  active: boolean;
}
export type AlarmDTO = {
  name: string;
  source: string;
  metric: string;
  trigger: string;
  paused: boolean;
  active: boolean;
}