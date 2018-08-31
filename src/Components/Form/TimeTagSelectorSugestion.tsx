import { MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import * as React from "react";
import { Query } from "react-apollo";

import { ME, TIME_TAGS } from "../../graphql/query";
import {
  timeTags,
  timeTags_timeTags,
  timeTagsVariables
} from "../../graphql/query/__generated__/timeTags";

const TagSelect = Suggest.ofType<timeTags_timeTags>();

class TimeTagSelectorSuguestion extends React.Component<
  { onAdd(add: timeTags_timeTags): any },
  { value?: timeTags_timeTags; filter: string }
> {
  public constructor(props: any) {
    super(props);
    this.state = { filter: "" };
  }
  public handleQueryChange(event: any) {
    this.setState({ filter: event.target.value });
  }
  public render() {
    return (
      <Query query={ME}>
        {({ data: { me } }) => {
          if (!me) {
            return;
          }
          return (
            <Query<timeTags, timeTagsVariables>
              query={TIME_TAGS}
              variables={{ userId: me.id }}
            >
              {({ loading, error, data, client }) => {
                const items: timeTags_timeTags[] = [];
                if (data != null && data.timeTags != null) {
                  data.timeTags.forEach(tag => {
                    if (tag != null && !tag.deleted) {
                      items.push(tag);
                    }
                  });
                }
                return (
                  <TagSelect
                    inputValueRenderer={tag => tag.name}
                    items={items}
                    inputProps={{
                      onChange: (event: any) => this.handleQueryChange(event),
                      value: this.state.filter,
                      placeholder: "Add tag...",
                      autoFocus: true
                    }}
                    itemRenderer={(
                      { id, name, color },
                      { handleClick, index, modifiers }
                    ) => (
                      <MenuItem
                        key={id}
                        onClick={handleClick}
                        tabIndex={index}
                        style={{
                          backgroundColor: color,
                          color: "white",
                          fontSize: 16,
                          fontWeight: "bolder",
                          margin: 2,
                          textAlign: "center"
                        }}
                        text={name}
                      />
                    )}
                    itemListPredicate={(query, tags) =>
                      tags.filter(tag =>
                        tag.name.toLowerCase().startsWith(query.toLowerCase())
                      )
                    }
                    onItemSelect={tag => {
                      if (this.props.onAdd != null) {
                        this.props.onAdd(tag);
                      }
                      this.setState({ value: tag, filter: "" });
                    }}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    popoverProps={{
                      minimal: true,
                      hasBackdrop: true,
                      backdropProps: {
                        marginHeight: 0,
                        marginWidth: 0
                      }
                    }}
                    closeOnSelect={false}
                    openOnKeyDown={true}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
export default TimeTagSelectorSuguestion;
