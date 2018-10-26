import React from "react";
import styled from "react-emotion";

const Container = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width}px;
  height: 100%;
  background-color: #eeeeee;
`;

const ShapeList = styled("ul")`
  list-style: none;
  padding: 16px 0 0 16px;
  margin: 0;
`;

const ShapeListItem = styled("li")`
  cursor: pointer;
  margin-bottom: 8px;
`;

export function Sidebar(props) {
  return (
    <Container width={props.width}>
      <ShapeList>
        {props.items.map(item => (
          <ShapeListItem
            key={item.id}
            onClick={() => props.onSelection(item.value, item.defaultOptions)}
          >
            {item.label}
          </ShapeListItem>
        ))}
      </ShapeList>
    </Container>
  );
}
