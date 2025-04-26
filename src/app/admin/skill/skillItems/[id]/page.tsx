"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/InputText";
import InputImage from "@/components/InputImage";
import InputRange from "@/components/InputRange";
import Select from "@/components/Select";
import useGetSkillCategory from "@/hook/useGetSkillCategory";

const EditSkill = () => {
  const { skillCategory, error, loading } = useGetSkillCategory();
  const [defaultImageUrl, setDefaultImageUrl] = useState<string | null>(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();
  const router = useRouter();
  const level = watch("level");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/skill/items/${id}`);
        reset(data);
        setDefaultImageUrl(data.icon);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (formData: any) => {
    try {
      const fileList = formData.icon;

      if (fileList && typeof fileList[0]?.name === "string") {
        const fileData = new FormData();
        fileData.append("file", fileList[0]);
        fileData.append("subPath", "skills/icon");
        fileData.append("publicId", id as string);

        const {
          data: { secure_url },
        } = await axios.post("/api/uploadFile", fileData);

        formData.icon = secure_url;
      }

      await axios.patch(`/api/skill/items/${id}`, formData);
      alert("수정 성공");
      router.push("/skills");
    } catch (error) {
      console.error(error);
      alert("수정 실패!");
    }
  };

  if (!skillCategory.length) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText id="name" label="스킬명" register={register} errors={errors} />

      <InputImage
        id="icon"
        label="Icon"
        register={register}
        errors={errors}
        preview
        defaultImageUrl={defaultImageUrl ?? undefined}
        setValue={setValue}
        watch={watch}
      />

      <InputRange
        id="level"
        label="레벨"
        register={register}
        errors={errors}
        min={1}
        max={10}
        value={level}
      />

      <InputText
        id="description"
        label="설명"
        register={register}
        errors={errors}
      />

      <Select
        id="categoryId"
        label="카테고리"
        options={skillCategory}
        register={register}
        errors={errors}
        required
      />

      <button type="submit">확인</button>
    </form>
  );
};

export default EditSkill;
