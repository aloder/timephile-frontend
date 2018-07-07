import { OperationVariables } from 'apollo-client';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';

import { IUserProps } from '../AuthRequired';
import { CREATE_TIME_TAG } from '../graphql/mutation';
import { ME, TIME_TAGS } from '../graphql/query';
import TimeEntryForm from './TimeTagForm';

class TimeTag extends React.Component<IUserProps> {
    public render() {
        return (
            <Mutation mutation={CREATE_TIME_TAG}>
                {(mutation) => {
                    return (<TimeEntryForm submit={(values) => submit(values, mutation)}/>)}}
            </Mutation>
        );
    }
}

const submit = (
    model : { name: string, description: string, color: string }, 
    timeTag: MutationFn<any, OperationVariables>
    ) => {
        timeTag({
            update: (store, { data : { createTimeTag } } ) => {
                const { me: { id }}: any = store.readQuery({ query: ME });
                const { timeTags }: any = store.readQuery({ query: TIME_TAGS, variables: { userId: id} });
                store.writeQuery({ query: TIME_TAGS, variables: { userId: id},  data: { timeTags: timeTags.concat(createTimeTag)} });
            },
            variables: { ...model },
        });
}

export default TimeTag;
