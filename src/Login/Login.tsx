import { OperationVariables } from 'apollo-client';
import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import { Redirect } from 'react-router';

import { login as indexLogin } from '..';
import { LOGIN } from '../graphql/mutation';
import { ME } from '../graphql/query';
import LoginForm from './LoginForm';


class Login extends React.Component{
    public submit(
        model : {
            email: string, 
            password: string 
        }, 
        login: MutationFn<any, OperationVariables>
    ) {
        login({
            update: (store, { data } ) => {
                const newData = { me: data.login.user}
                store.writeQuery({ query: ME, data: newData });
                indexLogin(data.login.token);
            },
            variables: { email: model.email, password: model.password },
            refetchQueries: [{ query: ME }]
        });
    }
    public render() {
        return (
            <Mutation mutation={LOGIN}>
                {(login, { data, error }) => {
                    console.warn(data);
                    if (data) {
                        return <Redirect to={'/'} />
                    }
                    return (<LoginForm error={error} submit={(values) => this.submit(values, login)}/>)}}
            </Mutation>
        );
    }
}

export default Login;