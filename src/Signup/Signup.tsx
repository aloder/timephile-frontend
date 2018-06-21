import { OperationVariables } from 'apollo-client';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { Redirect } from 'react-router';

import { login as indexLogin } from '..';
import { SIGN_UP } from '../graphql/mutation';
import { ME } from '../graphql/query';
import LoginForm from './SignupForm';


class Signup extends React.Component {
    public render() {
        return (
            <Mutation mutation={SIGN_UP}>
                {(signup, { data, error }) => {
                    if (data) {
                        indexLogin(data.signup.token);
                        return (<Redirect to={'/'} />)
                    }
                    return (<LoginForm submit={(values) => submit(values, signup)}/>)}}
            </Mutation>
        );
    }
}
const submit = (
    model : { email: string, name: string, password: string }, 
    signup: MutationFn<any, OperationVariables>) => {
        signup({
            update: (store, { data } ) => {
                const newData = { me: data.signup.user}
                store.writeQuery({ query: ME, data: newData });
            },
            variables: {
                email: model.email,
                name: model.name,  
                password: model.password 
            },
        });
}
export default Signup;