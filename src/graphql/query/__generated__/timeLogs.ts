

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: timeLogs
// ====================================================

export interface timeLogs_timeLogs_tags {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

export interface timeLogs_timeLogs {
  id: string;
  title: string;
  text: string | null;
  date: any | null;
  startTime: any | null;
  deleted: boolean | null;
  isRange: boolean | null;
  endTime: any | null;
  totalTime: number | null;
  tags: timeLogs_timeLogs_tags[] | null;
}

export interface timeLogs {
  timeLogs: (timeLogs_timeLogs | null)[];
}

export interface timeLogsVariables {
  userId: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================