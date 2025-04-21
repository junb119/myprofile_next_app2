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
    <div className="flex items-center mb-4 w-[30%]">
      <label
        htmlFor={id}
        className={`${showLabel ? "block mb-1 font-semibold text" : "hidden"}`}
      >
        {`${label} : `}
      </label>
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
        className={` border px-3 py-2 rounded ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />
      <p>{value}</p>
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputRange;
