import * as React from "react";
import styled from "react-emotion";

interface ShapeMenuProps {
  children: React.ReactNode;
  leftOffset: number;
}

const Container = styled("section")`
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
  padding-left: ${(props: ShapeMenuProps) => `${props.leftOffset}px;`}
  background-color: #eeeeee;
`;

const ShapeMenuItem = styled("button")``;

function ShapeMenu(props: ShapeMenuProps) {
  return <Container {...props}>{props.children}</Container>;
}

ShapeMenu.Item = ShapeMenuItem;

export { ShapeMenu };
