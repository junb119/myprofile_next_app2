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

const EditPortfolio = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
  } = useForm({
    mode: "onChange", // 필요
    shouldUnregister: false, // 중요: 동적으로 setValue된 값 유지
  });
  const { id } = useParams();
  const { skills, loading, error } = useGetSkills();
  const router = useRouter();
  const { roles } = useGetRoles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/portfolio/${id}`);
        reset(data);
        setValue(
          "skillIds",
          data.Skills.map((s) => s.id)
        );
        setValue(
          "roleIds",
          data.Role.map((r) => r.id)
        );
        setValue("detail", data.detail); // 🧠 아래 문제도 함께 처리
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset, roles, skills, loading, setValue]);

  const handleEditSubmit = async (data) => {
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
      const res = await axios.patch(`/api/portfolio/${id}`, data);
      console.log("Portfolio 편집 성공", res.data);
      alert("Portfolio 편집 성공");
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      alert("Portfolio 편집 실패!");
    }
  };

  if (loading) return <p>loading...</p>;
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
          watch={watch}
          setValue={setValue}
          label="역할"
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
        {watch("detail") !== undefined && (
          <Editor
            value={watch("detail")}
            onChange={(html) => setValue("detail", html)}
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
