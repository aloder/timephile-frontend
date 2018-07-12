import * as React from "react";
import { Query } from "react-apollo";

import { ME, TIME_TAGS } from "../../graphql/query";

class TimeTagSelector extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = { value: null };
  }
  public handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({ value: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }
  public render() {
    return (
      <Query query={ME}>
        {({ data: { me } }) => {
          if (!me) {
            return;
          }
          return (
            <Query query={TIME_TAGS} variables={{ userId: me.id }}>
              {({ loading, error, data, client }) => {
                let disabled: boolean = false;
                if (loading) {
                  disabled = true;
                }
                if (error) {
                  // TODO error message
                  disabled = true;
                }
                const options = [];
                if (data && data.timeTags) {
                  for (const d of data.timeTags) {
                    options.push(
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    );
                  }
                }

                return (
                  <div className="pt-select pt-fill">
                    <select
                      disabled={disabled}
                      defaultValue="Tag..."
                      name={`${this.props.name}`}
                      onBlur={event => this.props.onBlur(event)}
                      onChange={event => this.handleChange(event)}
                    >
                      <option> Tag...</option>
                      {options}
                    </select>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
export default TimeTagSelector;
