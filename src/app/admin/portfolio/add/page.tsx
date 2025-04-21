"use client";
import InputImage from "@/components/InputImage";
import InputText from "@/components/InputText";
import SelectMultiTag from "@/components/SelectMultiTag";
import TextareaField from "@/components/Textarea";
import Editor from "@/components/Editor";
import useGetRoles from "@/hook/useGetRoles";
import useGetSkills from "@/hook/useGetSkills";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddPortfolio = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "onChange", // 필요
    shouldUnregister: false, // 중요: 동적으로 setValue된 값 유지
  });
  const { skills, loading, error } = useGetSkills();
  const router = useRouter();
  const { roles } = useGetRoles();
  const handleAddSubmit = async (data) => {
    const file = data.thumb?.[0];
    // const filename = await getFilename(file, "/api/upload/icon");
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("subPath", "portfolio/thumb");
    const {
      data: { filename },
    } = await axios.post("/api/uploadFile", fileData);

    data.thumb = `/upload/portfolio/thumb/${filename}`;
    try {
      const res = await axios.post("/api/portfolio/add", data);
      console.log("Portfolio 등록 성공", res.data);
      alert("Portfolio 등록 성공");
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      alert("Portfolio 등록 실패!");
    }
  };

  if (loading) return <p>loading...</p>;
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddSubmit)}>
        <InputText
          id="title"
          label="포트폴리오 이름"
          register={register}
          errors={errors}
          required
        />
        <InputText
          id="period"
          label="작업 기간"
          register={register}
          errors={errors}
          required
        />
        <SelectMultiTag
          TagName="skillIds"
          Tags={skills}
          setValue={setValue}
          label="사용 기술"
          watch={watch}
        />
        {/* tools */}
        <InputText
          id="members"
          label="인원"
          register={register}
          errors={errors}
          required
        />
        <SelectMultiTag
          TagName="roleIds"
          Tags={roles}
          setValue={setValue}
          label="역할"
          watch={watch}
        />
        {/* description */}
        <TextareaField
          id="description"
          label="한 줄 설명"
          register={register}
          errors={errors}
          required
          rows={2}
        />

        {/* thumb */}
        <InputImage
          id="thumb"
          label="썸네일"
          register={register}
          errors={errors}
          preview
        />
        <InputText
          id="github"
          label="깃허브"
          register={register}
          errors={errors}
        />
        <InputText
          id="path"
          label="사이트 주소"
          register={register}
          errors={errors}
        />
        <Editor onChange={(html) => setValue("detail", html)} />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default AddPortfolio;
