import React from "react";
import { Text, Rect } from "react-konva";
import styled, { css } from "react-emotion";

const Container = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.width}px;
  height: 100%;
  background-color: #eeeeee;
`;

const ComponentList = styled("ul")`
  list-style: none;
  padding: 16px 0 0 16px;
  margin: 0;
`;

const ComponentListItem = styled("li")`
  margin-bottom: 8px;
`;

export function Sidebar(props) {
  const items = [
    { id: "text", component: Text, label: "Text" },
    { id: "rectangle", component: Rect, label: "Rectangle" }
  ];

  return (
    <Container width={props.width}>
      <ComponentList>
        {items.map(item => (
          <ComponentListItem key={item.id}>{item.label}</ComponentListItem>
        ))}
      </ComponentList>
    </Container>
  );
}
