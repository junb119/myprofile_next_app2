"use client";

import InputImage from "@/components/InputImage";
import InputRange from "@/components/InputRange";
import InputText from "@/components/InputText";
import Loader from "@/components/Loader";
import Select from "@/components/Select";
import useGetSkillCategory from "@/hook/useGetSkillCategory";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const AddSkill = () => {
  const router = useRouter();
  const { skillCategory, error, loading } = useGetSkillCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const level = watch("level");

  const onSubmit = async (data: any) => {
    let secureUrl = "";

    try {
      const file = data.icon?.[0];

      if (file && typeof (file as any).name === "string") {
        const fileData = new FormData();
        const publicId = uuidv4();
        fileData.append("file", file);
        fileData.append("subPath", "skills/icon");
        fileData.append("publicId", publicId);

        const {
          data: { secure_url },
        } = await axios.post("/api/uploadFile", fileData);

        secureUrl = secure_url;
      }

      const res = await axios.post("/api/skill/items", {
        ...data,
        icon: secureUrl,
      });

      alert("Skill 등록 성공");
      router.push("/skills");
    } catch (error) {
      console.error(error);
      alert("Skill 등록 실패!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow space-y-6">
        <InputText id="name" label="스킬명" register={register} errors={errors} />

        <InputImage
          id="icon"
          label="아이콘"
          register={register}
          errors={errors}
          preview
          setValue={setValue}
          watch={watch}
        />

        <InputRange
          id="level"
          label="숙련도"
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

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <Select
            id="categoryId"
            label="카테고리"
            options={skillCategory}
            register={register}
            errors={errors}
            required
            defaultValue={skillCategory[0]?.label}
          />
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 w-full max-w-xs px-6 py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
            스킬 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
