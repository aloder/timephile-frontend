import * as React from 'react';

import { ME, TIME_LOGS } from '../graphql/query';
import { Mutation, MutationFn } from 'react-apollo';

import { CREATE_TIME_LOG } from '../graphql/mutation';
import { IUserProps } from '../AuthRequired';
import { OperationVariables } from 'apollo-client';
import TimeEntryForm from './TimeEntryForm';

class TimeEntry extends React.Component<IUserProps> {
    public render() {
        return (
            <Mutation mutation={CREATE_TIME_LOG}>
                {(mutation) => {
                    return (<TimeEntryForm submit={(values) => submit(values, mutation)}/>)}}
            </Mutation>
        );
    }
}

const submit = (
    model : { title: string, text: string, startTime: Date, endTime: Date }, 
    timeLog: MutationFn<any, OperationVariables>
    ) => {
        console.warn(model);
        timeLog({
            update: (store, { data : { createTimeLog } } ) => {
                const { me: { id }}: any = store.readQuery({ query: ME });
                const { timeLogs }: any = store.readQuery({ query: TIME_LOGS, variables: { userId: id} });
                store.writeQuery({ query: TIME_LOGS, variables: { userId: id},  data: { timeLogs: timeLogs.concat(createTimeLog)} });
            },
            variables: { ...model },
        });
}

export default TimeEntry;
