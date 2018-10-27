import * as React from "react";
import styled from "react-emotion";

interface Props {
  onSave: () => void;
}

const ActionBar = styled("div")`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Action = styled("button")``;

export function Actions(props: Props) {
  return (
    <ActionBar>
      <Action onClick={props.onSave}>Save</Action>
    </ActionBar>
  );
}
