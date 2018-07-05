import { timeLogs_timeLogs_tags } from "../../schemaTypes";

export interface ITimeCardProps{
  id: string;
  title: string;
  text: string | null;
  date: any | null;
  startTime: any | null;
  endTime: any | null;
  totalTime: number | null;
  tags: timeLogs_timeLogs_tags[] | null;
}