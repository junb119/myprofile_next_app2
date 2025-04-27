"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  defaultValue?: string;
  required?: boolean;
}

const Select = ({
  id,
  label,
  options,
  register,
  errors,
  required = false,
  defaultValue,
}: SelectProps) => {
  return (
    <div className="mb-6 w-full">
      <label htmlFor={id} className="block text-lg font-semibold mb-2">
        {label}
      </label>

      <select
        id={id}
        defaultValue={defaultValue}
        {...register(id, {
          required: required && `${label}은(는) 필수 선택 항목입니다.`,
        })}
        className={`w-full border px-4 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {errors[id] && (
        <p className="text-sm text-red-500 mt-2">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default Select;
