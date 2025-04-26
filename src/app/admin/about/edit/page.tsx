"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputText from "@/components/InputText";
import InputList from "@/components/InputList";
import InputImage from "@/components/InputImage";
import { AboutMe } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Textarea from "@/components/Textarea";
import Loader from "@/components/Loader";

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
    try {
      const file = formData.image?.[0];

      if (file && typeof (file as any).name === "string") {
        // ✅ 새 파일이 업로드된 경우에만 업로드 API 요청
        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("subPath", "about/profile");
        fileData.append("publicId", formData.id);

        const {
          data: { secure_url },
        } = await axios.post("/api/uploadFile", fileData);

        console.log("secure_url", secure_url);
        formData.image = secure_url;
        console.log("formData.image", formData.image);
      }

      const res = await axios.patch("/api/about/", formData);
      console.log("about 업데이트 성공", res.data);
      alert("about 업데이트 성공");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("about 편집 실패!");
    }
  };
  if (!loaded) return <Loader />;

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
        defaultImageUrl={getValues("image")}
        preview
        setValue={setValue}
        watch={watch}
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
      <Textarea id="bio" label="소개글" register={register} errors={errors} />

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
