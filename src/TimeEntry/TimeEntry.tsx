import { OperationVariables } from 'apollo-client';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { IUserProps } from '../AuthRequired';
import { CREATE_TIME_LOG } from '../graphql/mutation';
import { ME, TIME_LOGS } from '../graphql/query';
import TimeEntryForm from './TimeEntryForm';

class TimeEntry extends React.Component<IUserProps> {
    public render() {
        return (
            <Mutation mutation={CREATE_TIME_LOG}>
                {(mutation) => {
                    return (<TimeEntryForm me={this.props.me} submit={(values) => {
                        const str = values.timeTagId
                        delete values.timeTagId;
                        const sub = {...values, tagIds: [str]}
                        submit(sub, mutation)}
                    }/>)}}
            </Mutation>
        );
    }
}

const submit = (
    model : { title: string, text: string, startTime: Date, endTime: Date, tagIds: string[] }, 
    timeLog: MutationFn<any, OperationVariables>
    ) => {
        console.warn(model);
        timeLog({
            update: (store, { data : { createTimeLog } } ) => {
                const { me: { id }}: any = store.readQuery({ query: ME });
                const { timeLogs }: any = store.readQuery({ query: TIME_LOGS, variables: { userId: id} });
                store.writeQuery({ query: TIME_LOGS, variables: { userId: id},  data: { timeLogs: timeLogs.concat(createTimeLog)} });
            },
            variables: { ...model},
        });
}

export default TimeEntry;
