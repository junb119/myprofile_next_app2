"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {  UseFormWatch } from "react-hook-form";

interface SelectMultiTagProps {
  Tags: { id: string; name: string; icon?: string }[];
  setValue: any;
  watch: UseFormWatch<any>; // ✅ 추가
  TagName: string;
  label: string;
}
const SelectMultiTag = ({
  Tags,
  setValue,
  TagName,
  watch,
  label,
}: SelectMultiTagProps) => {
  const selectedFromWatch = watch(TagName); // 실시간 감지
  const [selectedTagsId, setSelectedTagsId] = useState<string[]>([]);

  useEffect(() => {
    console.log(`선택된 ${TagName} 태그`, selectedTagsId);
    if (Array.isArray(selectedFromWatch)) {
      setSelectedTagsId(selectedFromWatch);
    }
  }, [selectedFromWatch]);

  const toggleSkill = (id: string) => {
    let updatedTags: string[];

    if (selectedTagsId.includes(id)) {
      updatedTags = selectedTagsId.filter((sid) => sid !== id);
    } else {
      updatedTags = [...selectedTagsId, id];
    }
    console.log(updatedTags);
    setSelectedTagsId(updatedTags);
    setValue(TagName, updatedTags); // react-hook-form에 수동 등록
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <p>{label} : </p>
      {Tags?.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => toggleSkill(tag.id)}
          className={`px-3 py-1 border rounded-full ${
            selectedTagsId.includes(tag.id)
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          {tag.icon && (
            <Image src={tag.icon} alt="icon" width="30" height={30} />
          )}
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default SelectMultiTag;
