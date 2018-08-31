import { Icon, Intent, Tag } from '@blueprintjs/core';
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
        onClick={() => (!this.state.selected) ? this.setState({ selected: true }): null}
        key={"Add-Tag-Bubble"}
        intent={(this.state.selected)? Intent.PRIMARY : Intent.SUCCESS}
        interactive={true}
        style={{ maxWidth: 200 }}
      >
      <div hidden={!this.state.selected}>
        <Icon icon="cross" iconSize={30} intent={Intent.NONE} onClick={() => this.setState({ selected: false})}/>
        {(this.state.selected)?
        <TimeTagSelectorSuguestion
          ref={() => "TimeTagSelecor"}
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
          <Icon icon="add" /> Add
        </div>
      </Tag>
    );
  }
}
export default AddTimeTagTag;
