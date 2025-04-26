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
  const [isUploading, setIsUploading] = useState(false); // 업로드 중 상태

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
          data.Skills.map((s: any) => s.id)
        );
        setValue(
          "roleIds",
          data.Role.map((r: any) => r.id)
        );
        setValue("detail", data.detail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, reset, roles, skills, setValue]);

  const handleEditSubmit = async (data: any) => {
    const file = data.thumb?.[0];
    let thumbUrl = initialThumbUrl;

    try {
      if (file && typeof (file as any).name === "string") {
        const publicId = id as string; // ✅ 고정 publicId

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

  // const handleEditorImageUpload = async (files, info, uploadHandler) => {
  //   const file = files[0];

  //   // 용량 제한 (10MB)
  //   if (file.size > 10 * 1024 * 1024) {
  //     uploadHandler({
  //       errorMessage: "10MB 이상 파일은 업로드할 수 없습니다.",
  //     });
  //     return false;
  //   }

  //   const formData = new FormData();
  //   const publicId = `portfolio/detail/misc/${uuidv4()}`;
  //   formData.append("file", file);
  //   formData.append("subPath", "portfolio/detail");
  //   formData.append("publicId", publicId);

  //   try {
  //     const {
  //       data: { secure_url },
  //     } = await axios.post("/api/uploadFile", formData);

  //     uploadHandler({
  //       result: [
  //         {
  //           url: secure_url,
  //           name: file.name,
  //           size: file.size,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("에디터 이미지 업로드 실패", error);
  //     uploadHandler({
  //       errorMessage: "이미지 업로드 실패. 용량 또는 네트워크를 확인해주세요.",
  //     });
  //     return false;
  //   }

  //   return false;
  // };
  const handleEditorImageUpload = async (
    files: any,
    info: any,
    uploadHandler: any
  ) => {
    const file = files?.[0];

    // ⚠️ 방어 코드 추가: 핸들러 없으면 fallback 허용 (또는 return false로 차단 가능)
    if (!file || typeof uploadHandler !== "function") {
      console.warn("❗uploadHandler가 정의되지 않았거나 파일 없음");
      return true; // 또는 return false; 로 base64 삽입 차단
    }
    setIsUploading(true);
    // 용량 제한
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

    // try {
    //   const {
    //     data: { secure_url },
    //   } = await axios.post("/api/uploadFile", formData);

    //   // ✅ 안전하게 핸들러 호출
    //   uploadHandler({
    //     result: [
    //       {
    //         url: secure_url,
    //         name: file.name,
    //         size: file.size,
    //       },
    //     ],
    //   });
    //   console.log("🔥 handler exists:", typeof uploadHandler);
    //   console.log("🔥 file size:", file.size);
    //   console.log("🔥 response url:", secure_url);

    //   return false; // base64 삽입 방지
    // } catch (error) {
    //   console.error("에디터 이미지 업로드 실패", error);

    //   uploadHandler({
    //     errorMessage:
    //       "이미지 업로드 실패. 용량 또는 네트워크 문제일 수 있습니다.",
    //   });

    //   return false;
    // }
    try {
      const {
        data: { secure_url },
      } = await axios.post("/api/uploadFile", formData);

      if (secure_url && typeof uploadHandler === "function") {
        uploadHandler({
          result: [
            {
              url: secure_url,
              name: file.name,
              size: file.size,
            },
          ],
        });
      } else {
        console.warn(
          "⚠️ uploadHandler 없거나 secure_url 없음. base64 삽입 가능성"
        );
      }
      setIsUploading(false);
      return false;
    } catch (error) {
      console.error("에디터 이미지 업로드 실패", error);

      // 👇 이게 에러 발생 지점이므로 타입 체크 확실히 하고 실행
      if (typeof uploadHandler === "function") {
        uploadHandler({
          errorMessage:
            "이미지 업로드 실패. 용량 또는 네트워크 문제일 수 있습니다.",
        });
      } else {
        console.warn("❌ uploadHandler가 정의되지 않아 fallback 방지 실패");
      }
      setIsUploading(false);
      return false;
    }
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
            onImageUploadBefore={(...args: any[]) => {
              console.log("🔥 onImageUploadBefore called with:", args);
              return (handleEditorImageUpload as any)(...args);
            }}
          />
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          {isUploading ? "이미지 업로드 중..." : "수정하기"}
        </button>
      </form>
    </div>
  );
};

export default EditPortfolio;
