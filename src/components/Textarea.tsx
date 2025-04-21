"use client";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextareaFieldProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  required?: boolean;
  rows?: number;
}

const TextareaField = ({
  id,
  label,
  register,
  errors,
  required = false,
  rows = 3,
}: TextareaFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        {...register(id, { required })}
        rows={rows}
        className="p-2 border rounded resize-none"
      />
      {errors[id] && (
        <span className="text-red-500 text-sm">
          {label}은(는) 필수 입력 항목입니다.
        </span>
      )}
    </div>
  );
};

export default TextareaField;
