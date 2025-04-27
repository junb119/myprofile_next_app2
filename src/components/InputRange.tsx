"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputRangeProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  showLabel?: boolean;
  defaultValue?: string;
  value?: string | number;
}

const InputRange = ({
  id,
  label,
  showLabel = true,
  disabled = false,
  required = false,
  min,
  max,
  register,
  errors,
  defaultValue,
  value,
}: InputRangeProps) => {
  return (
    <div className="mb-6 w-full">
      {showLabel && (
        <label htmlFor={id} className="block text-lg font-semibold mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        <input
          id={id}
          type="range"
          disabled={disabled}
          defaultValue={defaultValue}
          min={min}
          max={max}
          {...register(id, {
            required: required && `${label}은(는) 필수입니다`,
          })}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
            errors[id] ? "border-red-500" : "border-gray-300"
          }`}
        />

        <div className="min-w-[40px] text-center text-sm font-medium text-gray-700">
          {value}
        </div>
      </div>

      {errors[id] && (
        <p className="text-sm text-red-500 mt-2">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default InputRange;
