

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_user {
  id: string;
  email: string;
  name: string;
}

export interface login_login {
  token: string;
  user: login_login_user;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_user {
  id: string;
  email: string;
  name: string;
}

export interface signup_signup {
  token: string;
  user: signup_signup_user;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  email: string;
  password: string;
  name: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyEmail
// ====================================================

export interface verifyEmail {
  verifyEmail: boolean | null;
}

export interface verifyEmailVariables {
  link: string;
}


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
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTimeLog
// ====================================================

export interface DeleteTimeLog_deleteTimeLog {
  id: string;
  deleted: boolean | null;
}

export interface DeleteTimeLog {
  deleteTimeLog: DeleteTimeLog_deleteTimeLog | null;
}

export interface DeleteTimeLogVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createTimeTag
// ====================================================

export interface createTimeTag_createTimeTag {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

export interface createTimeTag {
  createTimeTag: createTimeTag_createTimeTag | null;
}

export interface createTimeTagVariables {
  name: string;
  description: string;
  color: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me {
  id: string;
  email: string;
  name: string;
}

export interface me {
  me: me_me | null;
}


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

// ====================================================
// GraphQL query operation: timeLogsRange
// ====================================================

export interface timeLogsRange_timeLogsRange_tags {
  id: string;
  name: string;
  color: string;
  description: string | null;
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

// ====================================================
// GraphQL query operation: timeTags
// ====================================================

export interface timeTags_timeTags {
  id: string;
  name: string;
  color: string;
  description: string | null;
}

export interface timeTags {
  timeTags: (timeTags_timeTags | null)[];
}

export interface timeTagsVariables {
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