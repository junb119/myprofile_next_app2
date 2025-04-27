"use client";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  showLabel?: boolean;
  defaultValue?: string;
  value?: string | number;
}

const InputText = <T extends FieldValues>({
  id,
  label,
  showLabel = true,
  disabled = false,
  required = false,
  minLength,
  maxLength,
  pattern,
  register,
  errors,
  placeholder,
  defaultValue,
}: InputProps<T>) => {
  return (
    <div className="mb-6 w-full">
      {showLabel && (
        <label htmlFor={id} className="block text-lg font-semibold mb-2">
          {label}
        </label>
      )}

      <input
        id={id}
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(id, {
          required: required && `${label}은(는) 필수입니다`,
          minLength: minLength && {
            value: minLength,
            message: `${label}은(는) 최소 ${minLength}자 이상이어야 합니다.`,
          },
          maxLength: maxLength && {
            value: maxLength,
            message: `${label}은(는) 최대 ${maxLength}자까지 입력 가능합니다.`,
          },
          pattern: pattern && {
            value: pattern,
            message: `${label} 형식이 올바르지 않습니다.`,
          },
        })}
        className={`w-full border px-4 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />

      {errors[id] && (
        <p className="text-sm text-red-500 mt-2">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputText;
