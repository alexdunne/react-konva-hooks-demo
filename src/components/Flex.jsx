import styled from "react-emotion";

export const Flex = styled("div")`
  display: flex;
  flex: ${props => (props.flex ? props.flex : 1)};
  flex-direction: ${props => (props.direction ? process.direction : "column")};
`;
