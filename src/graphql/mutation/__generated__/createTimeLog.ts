

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createTimeLog
// ====================================================

export interface createTimeLog_createTimeLog_tags {
  id: string;
  name: string;
  color: string;
  description: string | null;
  deleted: boolean | null;
}

export interface createTimeLog_createTimeLog {
  id: string;
  title: string;
  text: string | null;
  date: any | null;
  totalTime: number | null;
  startTime: any | null;
  endTime: any | null;
  isRange: boolean | null;
  deleted: boolean | null;
  tags: createTimeLog_createTimeLog_tags[] | null;
}

export interface createTimeLog {
  createTimeLog: createTimeLog_createTimeLog | null;
}

export interface createTimeLogVariables {
  title: string;
  text?: string | null;
  date?: any | null;
  startTime?: any | null;
  endTime?: any | null;
  totalTime?: number | null;
  tagIds?: string[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================