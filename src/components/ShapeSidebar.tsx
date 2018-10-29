import * as React from "react";
import styled from "react-emotion";

interface ShapeSidebarProps {
  children: React.ReactNode;
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

function ShapeSidebar(props: ShapeSidebarProps) {
  return (
    <Container>
      <ShapeList>{props.children}</ShapeList>
    </Container>
  );
}

ShapeSidebar.Item = ShapeListItem;

export { ShapeSidebar };
