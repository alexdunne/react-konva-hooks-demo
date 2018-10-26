import React from "react";
import styled from "react-emotion";

const Container = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  width: ${props => props.width}px;
  height: 100%;
  background-color: #eeeeee;
`;

const LayerList = styled("ul")`
  list-style: none;
  padding: 16px 0 0 16px;
  margin: 0;
`;

const LayerListItem = styled("li")`
  cursor: pointer;
  margin-bottom: 8px;
`;

export function LayerSidebar(props) {
  return (
    <Container width={props.width}>
      <LayerList>
        {props.layers.map(layer => (
          <LayerListItem key={layer.id}>{layer.name}</LayerListItem>
        ))}
      </LayerList>
    </Container>
  );
}
