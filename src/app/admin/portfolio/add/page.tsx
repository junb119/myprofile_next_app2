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
import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/Loader";

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
    const publicId = uuidv4();
    fileData.append("file", file);
    fileData.append("subPath", "portfolio/thumb");
    fileData.append("publicId", publicId);
    try {
      const {
        data: { secure_url },
      } = await axios.post("/api/uploadFile", fileData);

      const res = await axios.post("/api/portfolio/add", {
        ...data,
        thumb: secure_url,
      });
      console.log("Portfolio 등록 성공", res.data);
      alert("Portfolio 등록 성공");
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      alert("Portfolio 등록 실패!");
    }
  };
  // 페이지 상단에 추가
  const handleEditorImageUpload = async (files, info, uploadHandler) => {
    const file = files[0];

    // 용량 제한 (예: 10MB)
    if (file.size > 10 * 1024 * 1024) {
      uploadHandler({
        errorMessage: "10MB 이상 파일은 업로드할 수 없습니다.",
      });
      return false; // 삽입 막기
    }

    const formData = new FormData();
    const publicId = `portfolio/detail/misc/${uuidv4()}`;
    formData.append("file", file);
    formData.append("subPath", "portfolio/detail");
    formData.append("publicId", publicId);

    try {
      const {
        data: { secure_url },
      } = await axios.post("/api/uploadFile", formData);

      uploadHandler({
        result: [
          {
            url: secure_url,
            name: file.name,
            size: file.size,
          },
        ],
      });
    } catch (error) {
      console.error("에디터 이미지 업로드 실패", error);
      uploadHandler({
        errorMessage: "이미지 업로드 실패. 용량 또는 네트워크를 확인해주세요.",
      });
      return false; // base64 삽입 방지
    }

    return false; // 기본 삽입도 차단
  };

  if (loading) return <Loader />;
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
          setValue={setValue}
          watch={watch}
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
        <Editor
          value={watch("detail")}
          onChange={(html) => setValue("detail", html)}
          onImageUploadBefore={handleEditorImageUpload}
        />

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
