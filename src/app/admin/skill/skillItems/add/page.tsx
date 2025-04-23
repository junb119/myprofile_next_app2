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

  const onSubmit = async (data) => {
    let secureUrl = "";

    try {
      const file = data.icon?.[0];

      if (file instanceof File) {
        const fileData = new FormData();
        const publicId = uuidv4(); // Cloudinary에 저장할 고유 publicId
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

      console.log("Skill 등록 성공", res.data);
      alert("Skill 등록 성공");
      router.push("/skills");
    } catch (error) {
      console.error(error);
      alert("Skill 등록 실패!");
    }
  };

  if (loading) return <Loader />;

  return (
    <form>
      <InputText id="name" label="스킬명" register={register} errors={errors} />

      <InputImage
        id="icon"
        label="Icon"
        register={register}
        errors={errors}
        preview
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

      {error ? (
        <p>{error}</p>
      ) : (
        <Select
          id="categoryId"
          label="카테고리"
          options={skillCategory}
          register={register}
          errors={errors}
          required
          defaultValue={skillCategory[0].label}
        />
      )}

      <button onClick={handleSubmit(onSubmit)}>확인</button>
    </form>
  );
};

export default AddSkill;
