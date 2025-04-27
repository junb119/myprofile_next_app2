"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";

interface SelectMultiTagProps {
  Tags: { id: string; name: string; icon?: string }[];
  setValue: any;
  watch: UseFormWatch<any>;
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
  const selectedFromWatch = watch(TagName);
  const [selectedTagsId, setSelectedTagsId] = useState<string[]>([]);

  useEffect(() => {
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
    setSelectedTagsId(updatedTags);
    setValue(TagName, updatedTags);
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-3">{label}</label>

      <div className="flex flex-wrap gap-3">
        {Tags?.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggleSkill(tag.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedTagsId.includes(tag.id)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {tag.icon && (
              <Image
                src={tag.icon}
                alt="icon"
                width={24}
                height={24}
                className="object-contain"
              />
            )}
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectMultiTag;
