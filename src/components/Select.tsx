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
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        defaultValue={defaultValue}
        {...register(id, {
          required: required && `${label}은(는) 필수 선택 항목입니다.`,
        })}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[id] && <p>{errors[id]?.message?.toString()}</p>}
    </div>
  );
};

export default Select;
