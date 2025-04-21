"use client";
import InputImage from "@/components/InputImage";
import InputRange from "@/components/InputRange";
import InputText from "@/components/InputText";
import Select from "@/components/Select";
import useGetSkillCategory from "@/hook/useGetSkillCategory";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const AddSkill = () => {
  const router = useRouter();
  const { skillCategory, error, loading } = useGetSkillCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const level = watch("level");

  const onSubmit = async (data) => {
    const file = data.icon?.[0];
    // const filename = await getFilename(file, "/api/upload/icon");
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("subPath", "icons/skills");
    const {
      data: { filename },
    } = await axios.post("/api/uploadFile", fileData);


    data.icon = `/upload/icons/skills/${filename}`;
    try {
      const res = await axios.post("/api/skill/items", data);
      console.log("skill 등록 성공", res.data);
      alert("skill 등록 성공");
      router.push("/skills");
    } catch (error) {
      console.error(error);
      alert("skill 등록 실패!");
    }
  };
  if (loading) return <p>loading...</p>;
  return (
    <form>
      <InputText id="name" label="스킬명" register={register} errors={errors} />
      <InputImage
        id="icon"
        label="Icon"
        register={register}
        errors={errors}
        preview
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
