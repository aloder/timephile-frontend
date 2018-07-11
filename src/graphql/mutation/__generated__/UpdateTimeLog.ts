

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTimeLog
// ====================================================

export interface UpdateTimeLog_updateTimeLog_tags {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

export interface UpdateTimeLog_updateTimeLog {
  id: string;
  title: string;
  text: string | null;
  date: any | null;
  totalTime: number | null;
  startTime: any | null;
  endTime: any | null;
  isRange: boolean | null;
  deleted: boolean | null;
  tags: UpdateTimeLog_updateTimeLog_tags[] | null;
}

export interface UpdateTimeLog {
  updateTimeLog: UpdateTimeLog_updateTimeLog | null;
}

export interface UpdateTimeLogVariables {
  id: string;
  title: string;
  text?: string | null;
  date?: any | null;
  startTime?: any | null;
  endTime?: any | null;
  totalTime?: number | null;
  removeTagIds: string[];
  addTagIds: string[];
  isRange?: boolean | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================