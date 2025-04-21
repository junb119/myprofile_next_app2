import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

interface Props {
  value?: string;
  onChange: (content: string) => void;
}

const Editor = ({ value = "", onChange }: Props) => {
  return (
    <SunEditor
      defaultValue={value} // ✅ 초기값은 오직 여기서만!
      onChange={onChange}
      setOptions={{
        height: "auto",
        minHeight: "300px",
        iframe: false, // ✅ iframe 에러 방지
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["removeFormat"],
          "/",
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
          ["preview", "print"],
        ],
      }}
    />
  );
};

export default Editor;
