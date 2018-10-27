import * as React from "react";
import styled from "react-emotion";

interface LayerSidebarProps {
  layers: CanvasLayer[];
  width: number;
}

const Container = styled("div")`
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
`;

const LayerList = styled("ul")`
  list-style: none;
  padding: 16px 0 0 16px;
  margin: 0;
`;

const LayerListItem = styled("li")`
  user-select: none;
  margin-bottom: 8px;
`;

export function LayerSidebar(props: LayerSidebarProps) {
  return (
    <Container>
      <LayerList>
        {props.layers.map(layer => (
          <LayerListItem key={layer.id}>{layer.name}</LayerListItem>
        ))}
      </LayerList>
    </Container>
  );
}
