import * as React from "react";
import styled from "react-emotion";

interface SidebarProps {
  children: React.ReactNode;
}

const Container = styled("section")`
  width: 100%;
  height: 100vh;
  background-color: #eeeeee;
`;

const Header = styled("h2")`
  margin-top: 0;
  font-weight: 400;
  border-bottom: 1px solid #333;
  padding-bottom: 8px;
`;

const List = styled("ul")`
  list-style: none;
  padding: 16px 16px 0 16px;
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

Sidebar.Header = Header;
Sidebar.Item = SidebarItem;

export { Sidebar };
