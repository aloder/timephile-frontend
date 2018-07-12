import {
  Button,
  ButtonGroup,
  Card,
  InputGroup,
  Intent
} from "@blueprintjs/core";
import * as React from "react";

import TimeTagsColumn from ".";
import { timeTags } from "../../graphql/query/__generated__/timeTags";
import CreateTimeTag from "../Apollo/Mutation/CreateTimeTag";
import { TimeTagQuery } from "../Apollo/Query/TimeTagQuery";

class TimeTagSearchEdit extends React.PureComponent<
  {},
  { query: string; showDeleted: boolean }
> {
  public state = { query: "", showDeleted: false };
  public render() {
    const { query, showDeleted } = this.state;
    return (
      <CreateTimeTag>
        {({ submit }) => (
          <div
            style={{
              margin: 0,
              padding: 10,
              display: "flex",
              flexGrow: 1,
              flexDirection: "column"
            }}
          >
            <div
              style={{
                marginBottom: 20,
                display: "flex",
                flexDirection: "row"
              }}
            >
              <div style={{ flexGrow: 1, display: "flex" }}>
                <InputGroup
                  leftIcon="filter"
                  onChange={(event: any) => {
                    this.setState({ query: event.target.value });
                  }}
                  placeholder="Filter Time Tags..."
                  value={query}
                />
              </div>
              <ButtonGroup>
                <Button
                  onClick={() =>
                    submit({ name: "", description: "", color: "#FF2222" })
                  }
                  icon="add"
                  intent={Intent.SUCCESS}
                >
                  Time Tag
                </Button>
                <Button
                  title={"Only Show Deleted"}
                  intent={showDeleted ? Intent.DANGER : Intent.NONE}
                  icon={showDeleted ? "eye-on" : "eye-open"}
                  onClick={() => this.setState({ showDeleted: !showDeleted })}
                  rightIcon="cross"
                />
              </ButtonGroup>
            </div>
            <Card
              style={{
                position: "relative",
                overflowY: "auto",
                flexGrow: 1,
                margin: 0,
                backgroundColor: "#f5f5f5",
                border: "1px solid #e3e3e3",
                boxShadow: "inset 0 1px 5px rgba(0,0,0,.1)",
                padding: 3
              }}
            >
              <TimeTagQuery>
                {data => (
                  <TimeTagsColumn data={filter(data, query, showDeleted)} />
                )}
              </TimeTagQuery>
            </Card>
          </div>
        )}
      </CreateTimeTag>
    );
  }
}
const filter = (
  data: timeTags,
  query: string,
  showDeleted: boolean = false
): timeTags => {
  return {
    timeTags: data.timeTags.filter(o => {
      if (o == null) {
        return false;
      }
      if (showDeleted) {
        if (o.deleted) {
          return true;
        } else {
          return false;
        }
      }
      if (o.deleted) {
        return false;
      }
      if (o.name.startsWith(query)) {
        return true;
      }
      return false;
    })
  };
};
export default TimeTagSearchEdit;
