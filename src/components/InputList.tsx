"use client";

import React, { useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  UseFormWatch,
} from "react-hook-form";

interface InputListProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  errors: FieldErrors;
}

const InputList: React.FC<InputListProps> = ({
  id,
  label,
  setValue,
  getValues,
  register,
  errors,
}) => {
  const initial = getValues(id) || [];
  const [items, setItems] = useState<string[]>(initial);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const value = inputValue.trim();
    if (!value || items.includes(value)) return;
    const updated = [...items, value];
    setItems(updated);
    setValue(id, updated, { shouldValidate: true });
    setInputValue("");
  };

  const handleRemove = (item: string) => {
    const updated = items.filter((v) => v !== item);
    setItems(updated);
    setValue(id, updated, { shouldValidate: true });
  };
  useEffect(() => {
    const values = getValues(id) || [];
    setItems(values);
    console.log("items :", items);
    console.log("values :", values);
  }, [getValues, id]);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), handleAdd())
          }
          className="border border-zinc-300 rounded px-3 py-1 text-sm flex-1"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700"
        >
          추가
        </button>
      </div>

      {/* 리스트 출력 */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {items.map((item, idx) => (
            <span
              key={idx}
              className="bg-zinc-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="text-zinc-400 hover:text-rose-500 text-xs"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {errors[id] && (
        <p className="text-sm text-rose-500 mt-1">필수 항목입니다</p>
      )}

      {/* hidden input for react-hook-form */}
      <input type="hidden" {...register(id, { required: true })} />
    </div>
  );
};

export default InputList;
