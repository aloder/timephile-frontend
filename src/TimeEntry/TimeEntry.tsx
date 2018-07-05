import { OperationVariables } from 'apollo-client';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { CREATE_TIME_LOG } from '../graphql/mutation';
import { ME, TIME_LOGS_RANGE } from '../graphql/query';
import TimeEntryForm from './TimeEntryForm';

class TimeEntry extends React.Component<ITimeEntryProps> {
    private submit = (
        model : { title: string, text: string, totalTime: number, date:Date, startTime: Date, endTime: Date, tagIds: string[] },
        timeLog: MutationFn<any, OperationVariables>
        ) => {
            timeLog({
                update: (store, { data : { createTimeLog } } ) => {
                    const { me: { id }}: any = store.readQuery({ query: ME });
                    const { timeLogsRange }: any = store.readQuery({ query: TIME_LOGS_RANGE, variables: { ...this.props.variables, userId: id} });
                    store.writeQuery({ query: TIME_LOGS_RANGE, variables: { ...this.props.variables, userId: id },  data: { timeLogsRange: timeLogsRange.concat(createTimeLog)} });
                },
                variables: { ...model },
            });
    }
    public render() {
        return (
            <Mutation mutation={CREATE_TIME_LOG}>
                {(mutation) => {
                    return (<TimeEntryForm submit={(values) => {
                        // TODO Move somewhere else
                        const tagIds:string[] = [];
                        if(values.timeTagId && values.timeTagId !== ''){
                            tagIds.push(values.timeTagId);
                        }
                        delete values.timeTagId;
                        if(values.totalTime){
                            delete values.startTime;
                            delete values.endTime;
                        }
                        const sub = {...values, tagIds};
                        this.submit(sub, mutation);
                    }}/>)}}
            </Mutation>
        );
    }
}


interface ITimeEntryProps {
    query: any;
    variables: any;
}
export default TimeEntry;

