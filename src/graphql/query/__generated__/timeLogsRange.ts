

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: timeLogsRange
// ====================================================

export interface timeLogsRange_timeLogsRange_tags {
  id: string;
  name: string;
  color: string;
  description: string | null;
  deleted: boolean | null;
}

export interface timeLogsRange_timeLogsRange {
  id: string;
  title: string;
  text: string | null;
  date: any | null;
  startTime: any | null;
  endTime: any | null;
  deleted: boolean | null;
  isRange: boolean | null;
  totalTime: number | null;
  tags: timeLogsRange_timeLogsRange_tags[] | null;
}

export interface timeLogsRange {
  timeLogsRange: (timeLogsRange_timeLogsRange | null)[];
}

export interface timeLogsRangeVariables {
  userId: string;
  startDate: any;
  endDate: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================