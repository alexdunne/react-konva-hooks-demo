import * as React from "react";

import { EditorProps } from "./ShapeEditor";
import { Label } from "./Form/Label";
import { Row } from "./Form/Row";
import { TextInput } from "./Form/TextInput";

export function TextShapeEditor(props: EditorProps) {
  return (
    <div>
      <Row>
        <Label>
          Content
          <TextInput
            value={props.options.text}
            onChange={e => {
              props.onChange({ text: e.target.value });
            }}
          />
        </Label>
      </Row>
      <Row>
        <Label>
          Colour
          <TextInput
            value={props.options.fill}
            onChange={e => {
              props.onChange({ fill: e.target.value });
            }}
          />
        </Label>
      </Row>
    </div>
  );
}
