import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

interface Props {
  value?: string;
  onChange: (content: string) => void;
  onImageUploadBefore?: (
    files: File[],
    info: object,
    uploadHandler: (data: { result?: any[]; errorMessage?: string }) => void
  ) => boolean | Promise<boolean>;
}

const Editor = ({ value = "", onChange, onImageUploadBefore }: Props) => {
  return (
    <SunEditor
      defaultValue={value}
      onChange={onChange}
      onImageUploadBefore={onImageUploadBefore}
      setOptions={{
        height: "auto",
        minHeight: "300px",
        iframe: false,
        imageUploadUrl: undefined, // ⛔ 기본 업로드 방식 비활성화
        imageUploadHeader: undefined,
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
