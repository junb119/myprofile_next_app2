"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputText from "@/components/InputText";
import InputList from "@/components/InputList";
import InputImage from "@/components/InputImage";
import { AboutMe } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AboutMeFormValues {
  id: string;
  name: string;
  tagline: string;
  email: string;
  githubUrl: string;
  bio: string;
  image: string;
  skills: string[];
  favorites: string[];
  fields: Record<string, string>;
}

export default function EditAbout() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<AboutMe>({
    defaultValues: {
      id: "",
      name: "",
      tagline: "",
      email: "",
      githubUrl: "",
      bio: "",
      image: "",
      skills: [],
      favorites: [],
      fields: {},
    },
  });
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  // 초기 데이터 불러오기
  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        reset({
          ...data,
          skills: data.skills || [],
          favorites: data.favorites || [],
          fields: data.fields || {},
        });
        setLoaded(true);
      });
  }, [reset]);

  const onSubmit = async (formData: AboutMeFormValues) => {
    const file = formData.image?.[0];
    // const filename = await getFilename(file, "/api/upload/icon");
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("subPath", "about/profile");
    try {
      const {
        data: { filename },
      } = await axios.post("/api/uploadFile", fileData);

      formData.image = `/upload/about/profile/${filename}`;

      const res = await axios.patch("/api/about/", formData);
      console.log("about 업데이트 성공", res.data);
      alert("about 업데이트 성공");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("about 편집 실패!");
    }
  };
  if (!loaded) return <div className="text-center py-10">loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto px-4 py-6"
    >
      <h2 className="text-xl font-semibold mb-4">About Me 수정</h2>

      <InputImage
        id="image"
        label="프로필 이미지"
        register={register}
        errors={errors}
        preview
      />

      <InputText
        id="name"
        label="이름"
        register={register}
        errors={errors}
        required
      />
      <InputText
        id="tagline"
        label="한 줄 소개"
        register={register}
        errors={errors}
      />
      <InputText
        id="email"
        label="이메일"
        register={register}
        errors={errors}
        required
      />
      <InputText
        id="githubUrl"
        label="GitHub 주소"
        register={register}
        errors={errors}
      />
      <InputText id="bio" label="소개글" register={register} errors={errors} />

      <InputList
        id="skills"
        label="사용 기술"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <InputList
        id="favorites"
        label="좋아하는 것들"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <InputList
        id="fields"
        label="추가 필드"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
