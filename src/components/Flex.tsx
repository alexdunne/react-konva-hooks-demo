import styled from "react-emotion";

interface Props {
  flex?: number;
  direction?: "row" | "column";
  style?: any;
}

export const Flex = styled("div")<Props>`
  display: flex;
  flex: ${(props: Props) => (props.flex ? props.flex : 1)};
  flex-direction: ${(props: Props) =>
    props.direction ? props.direction : "column"};
`;
