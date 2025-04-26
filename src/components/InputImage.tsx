// "use client";
// import React, { PureComponent, useEffect, useState } from "react";
// import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// interface InputImageProps {
//   id: string;
//   label: string;
//   register: UseFormRegister<FieldValues>;
//   errors: FieldErrors;
//   required?: boolean;
//   disabled?: boolean;
//   showLabel?: boolean;
//   preview?: boolean;
//   defaultImageUrl?: string;
// }

// const InputImage = ({
//   id,
//   label,
//   showLabel = true,
//   disabled = false,
//   required = false,
//   register,
//   errors,
//   preview,
//   defaultImageUrl,
// }: InputImageProps) => {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setPreviewUrl(imageUrl);
//     }
//   };

//   useEffect(() => {
//     if (defaultImageUrl) {
//       setPreviewUrl(defaultImageUrl);
//     }
//   }, [defaultImageUrl]);

//   return (
//     <div className="flex items-center mb-4 w-[30%]">
//       <label
//         htmlFor={id}
//         className={`${showLabel ? "block mb-1 font-semibold text" : "hidden"}`}
//       >
//         {`${label} : `}
//       </label>

//       <input
//         id={id}
//         type="file"
//         disabled={disabled}
//         accept="image/*"
//         {...register(id, {
//           required: required && `${label}은(는) 필수입니다`,
//           onChange: handleChange,
//         })}
//         className={` border px-3 py-2 rounded ${
//           errors[id] ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {preview && previewUrl && (
//         <img src={previewUrl} alt="preview" width={100} />
//       )}
//       {errors[id] && (
//         <p className="text-sm text-red-500 mt-1">
//           {errors[id]?.message?.toString()}
//         </p>
//       )}
//     </div>
//   );
// };

// export default InputImage;
"use client";
import React, { useEffect, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface InputImageProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errors: FieldErrors<T>;
  required?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  preview?: boolean;
  defaultImageUrl?: string;
}

const InputImage = <T extends FieldValues>({
  id,
  label,
  register,
  setValue,
  watch,
  errors,
  required = false,
  disabled = false,
  showLabel = true,
  preview = true,
  defaultImageUrl,
}: InputImageProps<T>) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");

  const selectedFile = watch(id);

  useEffect(() => {
    // 기본 이미지 보여주기 (edit 시)
    if (defaultImageUrl) {
      setPreviewUrl(defaultImageUrl);
    }
  }, [defaultImageUrl]);

  useEffect(() => {
    if (
      mode === "upload" &&
      selectedFile &&
      typeof selectedFile[0]?.name === "string"
    ) {
      const file = selectedFile[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else if (mode === "url" && typeof selectedFile === "string") {
      setPreviewUrl(selectedFile);
    }
  }, [selectedFile, mode]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setValue(id, url as any);
  };

  return (
    <div className="mb-4">
      {showLabel && <label className="block font-semibold mb-1">{label}</label>}

      <div className="flex gap-4 mb-2">
        <label className="text-sm">
          <input
            type="radio"
            value="upload"
            checked={mode === "upload"}
            onChange={() => {
              setMode("upload");
              setValue(id, null as any); // 기존 URL 값 초기화
              setPreviewUrl(null);
            }}
            className="mr-1"
          />
          파일 업로드
        </label>
        <label className="text-sm">
          <input
            type="radio"
            value="url"
            checked={mode === "url"}
            onChange={() => {
              setMode("url");
              setValue(id, "" as any); // 파일 초기화
              setPreviewUrl(null);
            }}
            className="mr-1"
          />
          이미지 URL
        </label>
      </div>

      {mode === "upload" ? (
        <input
          type="file"
          id={id}
          accept="image/*"
          disabled={disabled}
          {...register(id, {
            required: required && `${label}은(는) 필수입니다`,
          })}
          className={`w-full border px-3 py-2 rounded ${
            errors[id] ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : (
        <input
          type="text"
          placeholder="https://example.com/icon.svg"
          onChange={handleUrlChange}
          className={`w-full border px-3 py-2 rounded ${
            errors[id] ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {preview && previewUrl && (
        <div className="mt-2">
          <img src={previewUrl} alt="preview" width={100} />
        </div>
      )}

      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputImage;
