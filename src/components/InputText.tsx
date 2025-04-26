import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface InputProps<T extends FieldValues> {
  id: string;
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
    <div className="flex items-center mb-4 w-[30%]">
      <label
        htmlFor={id}
        className={`${showLabel ? "block mb-1 font-semibold text" : "hidden"}`}
      >
        {`${label} : `}
      </label>
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
        className={` border px-3 py-2 rounded ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[id] && (
        <p className="text-sm text-red-500 mt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default InputText;
