import { Intent, Tag } from '@blueprintjs/core';
import { FieldProps } from 'formik';
import * as React from 'react';

import TimeTagSelectorSuguestion from './TimeTagSelectorSugestion';


class AddTimeTagTag extends React.Component<
  FieldProps<any>,
  { selected: boolean }
> {
  public state = { selected: false }
  public render() {
    const { field:{ name }, form:{ setFieldValue,values } } = this.props;
    return (
      <Tag
        onClick={() => this.setState({ selected: true })}
        onMouseLeave={() => this.setState({ selected: false })}
        key={"Add-Tag-Bubble"}
        intent={Intent.SUCCESS}
        interactive={true}
        style={{ maxWidth: 200 }}
      >
      <div hidden={!this.state.selected}>
        {(this.state.selected)?
        <TimeTagSelectorSuguestion
          onAdd={tag => {
            const find = values[name].find((t:any) => t.id === tag.id);
            if (find) {
              return;
            }
            if (values[name] != null) {
              setFieldValue(name, [
                ...values[name],
                tag
              ]);
            } else {
              setFieldValue(name, [tag]);
            }
          }}
        />: null}
        </div>
        <div hidden={this.state.selected}>
          <span hidden={this.state.selected} className="pt-icon-add" /> Add
        </div>
      </Tag>
    );
  }
}
export default AddTimeTagTag;
