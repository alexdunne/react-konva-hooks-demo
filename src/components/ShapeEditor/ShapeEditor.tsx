import * as React from "react";

import { ShapeTypes } from "../../App";
import { TextShapeEditor } from "./TextShapeEditor";

export interface EditorProps {
  options: {
    [key: string]: any;
  };
  onChange: (newOptions: { [key: string]: any }) => void;
}

type ShapeEditorProps = EditorProps & { type: ShapeTypes };

export function ShapeEditor(props: ShapeEditorProps) {
  const { type, ...rest } = props;

  const shapeToEditorMap = {
    [ShapeTypes.Text]: TextShapeEditor
  };

  const Editor = shapeToEditorMap[props.type];

  return <Editor {...rest} />;
}