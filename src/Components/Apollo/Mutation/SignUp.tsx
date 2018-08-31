import { GraphQLError } from "graphql";
import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";

import { SIGN_UP } from "../../../graphql/mutation";
import {
  signup,
  signup_signup,
  signupVariables
} from "../../../graphql/mutation/__generated__/signup";

class SignUp extends React.PureComponent<{
  children(
    create: ((
      variables: signupVariables
    ) => Promise<{
      errors?: GraphQLError[];
      signup?: signup_signup;
    }>)
  ): React.ReactNode;
}> {
  private submit = async (
    values: signupVariables,
    mutation: MutationFn<signup, signupVariables>
  ): Promise<{
    errors?: GraphQLError[];
    signup?: signup_signup;
  }> => {
    const data = await mutation({
      variables: values
    }).catch(errors => {
      return { data: null, errors };
    });
    if (data && data.errors && data.errors.graphQLErrors) {
      return { errors: data.errors.graphQLErrors };
    }
    if (data && data.data != null && data.data.signup) {
      return { signup: data.data.signup };
    }
    return {};
  };
  public render() {
    return (
      <Mutation<signup, signupVariables> mutation={SIGN_UP}>
        {(mutation, { error }) => {
          return this.props.children(values => this.submit(values, mutation));
        }}
      </Mutation>
    );
  }
}
export default SignUp;
