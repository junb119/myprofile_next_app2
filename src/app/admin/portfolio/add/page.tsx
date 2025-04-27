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
  const [uploadingCount, setUploadingCount] = useState(0);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });
  const { skills, loading } = useGetSkills();
  const router = useRouter();
  const { roles } = useGetRoles();

  const handleAddSubmit = async (data: any) => {
    const file = data.thumb?.[0];
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

      alert("Portfolio 등록 성공");
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      alert("Portfolio 등록 실패!");
    }
  };

  const handleEditorImageUpload = async (files: any, info: any, uploadHandler: any) => {
    const file = files?.[0];
    if (!file || typeof uploadHandler !== "function") {
      console.warn("❗uploadHandler가 정의되지 않았거나 파일 없음");
      return true;
    }
    setUploadingCount((prev) => prev + 1);

    if (file.size > 10 * 1024 * 1024) {
      uploadHandler({
        errorMessage: "10MB 이상 파일은 업로드할 수 없습니다.",
      });
      setUploadingCount((prev) => prev - 1);
      return false;
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

      if (secure_url) {
        uploadHandler({
          result: [
            {
              url: secure_url,
              name: file.name,
              size: file.size,
            },
          ],
        });
      }
      return false;
    } catch (error) {
      console.error("에디터 이미지 업로드 실패", error);
      uploadHandler({
        errorMessage: "이미지 업로드 실패. 용량 또는 네트워크를 확인해주세요.",
      });
      return false;
    } finally {
      setUploadingCount((prev) => prev - 1);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <form onSubmit={handleSubmit(handleAddSubmit)} className="bg-white p-8 rounded-lg shadow space-y-6">
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
        <TextareaField
          id="description"
          label="한 줄 설명"
          register={register}
          errors={errors}
          required
          rows={2}
        />
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
          label="깃허브 주소"
          register={register}
          errors={errors}
        />
        <InputText
          id="path"
          label="프로젝트 주소"
          register={register}
          errors={errors}
        />
        <div className="space-y-2">
          <label className="block text-lg font-semibold mb-1">상세 내용</label>
          <Editor
            value={watch("detail")}
            onChange={(html) => setValue("detail", html)}
            onImageUploadBefore={(...args: any[]) => {
              return (handleEditorImageUpload as any)(...args);
            }}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={uploadingCount > 0}
            className={`mt-6 w-full max-w-xs px-6 py-3 rounded-md text-white font-semibold ${
              uploadingCount > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploadingCount > 0 ? "이미지 업로드 중..." : "포트폴리오 등록하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPortfolio;
