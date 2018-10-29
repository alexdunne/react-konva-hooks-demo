import * as React from "react";
import styled from "react-emotion";

interface SidebarProps {
  children: React.ReactNode;
}

const Container = styled("div")`
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
`;

const List = styled("ul")`
  list-style: none;
  padding: 16px 0 0 16px;
  margin: 0;
`;

const SidebarItem = styled("li")`
  cursor: pointer;
  margin-bottom: 8px;
`;

function Sidebar(props: SidebarProps) {
  return (
    <Container>
      <List>{props.children}</List>
    </Container>
  );
}

Sidebar.Item = SidebarItem;

export { Sidebar };
