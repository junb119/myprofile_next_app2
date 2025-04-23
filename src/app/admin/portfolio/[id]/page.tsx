"use client";

import InputImage from "@/components/InputImage";
import InputText from "@/components/InputText";
import SelectMultiTag from "@/components/SelectMultiTag";
import TextareaField from "@/components/Textarea";
import Editor from "@/components/Editor";
import useGetRoles from "@/hook/useGetRoles";
import useGetSkills from "@/hook/useGetSkills";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "@/components/Loader";
import { v4 as uuidv4 } from "uuid";

const EditPortfolio = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
  });

  const { id } = useParams();
  const { skills, loading } = useGetSkills();
  const { roles } = useGetRoles();
  const router = useRouter();
  const [initialThumbUrl, setInitialThumbUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/portfolio/${id}`);
        reset(data);
        setInitialThumbUrl(data.thumb);
        setValue(
          "skillIds",
          data.Skills.map((s) => s.id)
        );
        setValue(
          "roleIds",
          data.Role.map((r) => r.id)
        );
        setValue("detail", data.detail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset, roles, skills, setValue]);

  const handleEditSubmit = async (data) => {
    const file = data.thumb?.[0];
    let thumbUrl = initialThumbUrl;

    try {
      if (file instanceof File) {
        const publicId = id; // ✅ 고정 publicId

        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("subPath", "portfolio/thumb");
        fileData.append("publicId", publicId);

        const {
          data: { secure_url },
        } = await axios.post("/api/uploadFile", fileData);

        thumbUrl = secure_url;
      }

      const res = await axios.patch(`/api/portfolio/${id}`, {
        ...data,
        thumb: thumbUrl,
      });

      console.log("Portfolio 편집 성공", res.data);
      alert("Portfolio 편집 성공");
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      alert("Portfolio 편집 실패!");
    }
  };

  const handleEditorImageUpload = async (files, info, uploadHandler) => {
    const file = files[0];

    // 용량 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      uploadHandler({
        errorMessage: "10MB 이상 파일은 업로드할 수 없습니다.",
      });
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
      return false;
    }

    return false;
  };

  if (loading) return <Loader />;

  return (
    <div>
      <form onSubmit={handleSubmit(handleEditSubmit)}>
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
          watch={watch}
          setValue={setValue}
          label="사용 기술"
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
          watch={watch}
          setValue={setValue}
          label="역할"
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
        {watch("detail") !== undefined && (
          <Editor
            value={watch("detail")}
            onChange={(html) => setValue("detail", html)}
            onImageUploadBefore={handleEditorImageUpload}
          />
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default EditPortfolio;
