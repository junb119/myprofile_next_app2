"use client";
import React, { PureComponent, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface InputImageProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  preview?: boolean;
  defaultImageUrl?: string;
}

const InputImage = ({
  id,
  label,
  showLabel = true,
  disabled = false,
  required = false,
  register,
  errors,
  preview,
  defaultImageUrl,
}: InputImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  return (
    <div className="flex items-center mb-4 w-[30%]">
      <label
        htmlFor={id}
        className={`${showLabel ? "block mb-1 font-semibold text" : "hidden"}`}
      >
        {`${label} : `}
      </label>

      <input
        id={id}
        type="file"
        disabled={disabled}
        accept="image/*"
        {...register(id, {
          required: required && `${label}은(는) 필수입니다`,
          onChange: handleChange,
        })}
        className={` border px-3 py-2 rounded ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {preview && previewUrl && (
        <img src={previewUrl || defaultImageUrl} alt="preview" width={100} />
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
