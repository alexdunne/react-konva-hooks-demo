import * as React from "react";
import styled from "react-emotion";

interface ShapeConfig {
  id: string;
  label: string;
  value: string;
  defaultOptions: any;
}

interface ShapeSidebarProps {
  shapes: ShapeConfig[];
  width: number;
  onSelection: (value: string, options: any) => void;
}

const Container = styled("div")`
  width: 100%;
  height: 100vh;
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

export function ShapeSidebar(props: ShapeSidebarProps) {
  return (
    <Container>
      <ShapeList>
        {props.shapes.map(shape => (
          <ShapeListItem
            key={shape.id}
            onClick={() => props.onSelection(shape.value, shape.defaultOptions)}
          >
            {shape.label}
          </ShapeListItem>
        ))}
      </ShapeList>
    </Container>
  );
}
