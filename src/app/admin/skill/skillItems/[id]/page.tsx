"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Skill, SkillCategory } from "@prisma/client";
import Input from "@/components/InputText";
import { useParams, useRouter } from "next/navigation";
import InputText from "@/components/InputText";
import InputImage from "@/components/InputImage";
import InputRange from "@/components/InputRange";
import Select from "@/components/Select";
import useGetSkillCategory from "@/hook/useGetSkillCategory";
import { getFilename } from "@/utilities/getFilename";
import { uploadFile } from "@/lib/testuploadFilePatch";

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
  } = useForm();
  const router = useRouter();
  const level = watch("level");
  const previewIcon = watch("icon");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/skill/items/${[id]}`);
        reset(data);
        setDefaultImageUrl(data.icon);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (formData) => {
    // submitData.append("name", formData.name);
    // submitData.append("description", formData.description);
    // submitData.append("level", formData.level.toString());
    // submitData.append("categoryId", formData.categoryId);

    const fileList = formData.icon;
    if (fileList && fileList.length > 0) {
      // const { filename, fullPath } = await uploadFile(
      //   fileList[0],
      //   "/icons/skills"
      // );

      const fileData = new FormData();
      fileData.append("file", fileList[0]);
      fileData.append("subPath", "icons/skills");
      const {
        data: { filename },
      } = await axios.post("/api/uploadFile", fileData);

      // const filename = await getFilename(fileList[0], "/api/upload/icon");
      formData.icon = `/upload/icons/skills/${filename}`;
    }
    // const payload = {
    //   name: formData.name,
    //   description: formData.description,
    //   level: formData.level.toString(),
    //   categoryId: formData.categoryId,
    //   icon: formData.icon,
    // };
    try {
      await axios.patch(`/api/skill/items/${id}`, formData);
      alert("수정 성공");
      router.push("/skills");
    } catch (error) {
      console.error(error);
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
        defaultImageUrl={defaultImageUrl}
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
