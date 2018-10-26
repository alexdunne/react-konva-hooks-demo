import React from "react";
import { Text, Rect } from "react-konva";
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
  const items = [
    {
      id: "text",
      label: "Text",
      shape: Text,
      defaultOptions: {
        text: "Test"
      }
    },
    {
      id: "rectangle",
      label: "Rectangle",
      shape: Rect,
      defaultOptions: {
        x: 50,
        y: 50,
        height: 100,
        width: 200,
        fill: "red"
      }
    }
  ];

  return (
    <Container width={props.width}>
      <ShapeList>
        {items.map(item => (
          <ShapeListItem
            key={item.id}
            onClick={() => props.onSelection(item.shape, item.defaultOptions)}
          >
            {item.label}
          </ShapeListItem>
        ))}
      </ShapeList>
    </Container>
  );
}
