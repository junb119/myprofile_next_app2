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
import InputList from "@/components/InputList";
type PortfolioFormValues = {
  title: string;
  period: string;
  skillIds: string[];
  roleIds: string[];
  members: string;
  description: string;
  detail: string;
  thumb: any;
  github?: string;
  path?: string;
  modalTags: string[];
  attribute?: string;
  detailIntro?:string
};

const EditPortfolio = () => {
  const [uploadingCount, setUploadingCount] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<PortfolioFormValues>({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      modalTags: [], // ✅ 추가
    },
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
        console.error(error);
      }
    };
    fetchData();
  }, [id, reset, roles, skills, setValue]);

  const handleEditSubmit = async (data: any) => {
    const file = data.thumb?.[0];
    let thumbUrl = initialThumbUrl;

    try {
      if (file && typeof (file as any).name === "string") {
        const publicId = id as string;

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

      alert("Portfolio 수정 성공");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Portfolio 수정 실패!");
    }
  };

  // const handleEditorImageUpload = async (files: any, info: any, uploadHandler: any) => {
  //   const file = files?.[0];
  //   if (!file || typeof uploadHandler !== "function") {
  //     console.warn("❗uploadHandler가 정의되지 않았거나 파일 없음");
  //     return true;
  //   }
  //   setIsUploading(true);

  //   if (file.size > 10 * 1024 * 1024) {
  //     uploadHandler({
  //       errorMessage: "10MB 이상 파일은 업로드할 수 없습니다.",
  //     });
  //     setIsUploading(false);
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

  //     if (secure_url) {
  //       uploadHandler({
  //         result: [
  //           {
  //             url: secure_url,
  //             name: file.name,
  //             size: file.size,
  //           },
  //         ],
  //       });
  //     }
  //     setIsUploading(false);
  //     return false;
  //   } catch (error) {
  //     console.error("에디터 이미지 업로드 실패", error);
  //     if (typeof uploadHandler === "function") {
  //       uploadHandler({
  //         errorMessage: "이미지 업로드 실패. 네트워크를 확인해주세요.",
  //       });
  //     }
  //     setIsUploading(false);
  //     return false;
  //   }
  // };
  const handleEditorImageUpload = async (
    files: any,
    info: any,
    uploadHandler: any
  ) => {
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
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_detail_image"); // ⚠️ 너의 preset 이름으로 교체
    formData.append("folder", "portfolio/detail"); // Cloudinary 내 업로드 경로
    formData.append("public_id", `portfolio_detail_${uuidv4()}`);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const { secure_url } = res.data;

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
      console.error("❌ Cloudinary 직접 업로드 실패", error);
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
      <form
        onSubmit={handleSubmit(handleEditSubmit)}
        className="bg-white p-8 rounded-lg shadow space-y-6"
      >
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
        <InputList
          id="modalTags"
          label="태그"
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          defaultValue={watch("modalTags")} // ✅ 이게 핵심
        />
        <TextareaField
          id="description"
          label="한 줄 설명"
          register={register}
          errors={errors}
          required
          rows={2}
        />
        <TextareaField
          id="detailIntro"
          label="모달용 소개"
          register={register}
          errors={errors}
          rows={10}
        />
        <InputImage
          id="thumb"
          label="썸네일"
          register={register}
          errors={errors}
          preview
          setValue={setValue}
          watch={watch}
        />{" "}
        <InputText
          id="attribute"
          label="기여도"
          register={register}
          errors={errors}
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
        <div className="space-y-2">
          <label className="block text-lg font-semibold mb-1">상세 내용</label>
          {watch("detail") !== undefined && (
            <Editor
              value={watch("detail")}
              onChange={(html) => setValue("detail", html)}
              onImageUploadBefore={(...args: any[]) => {
                return (handleEditorImageUpload as any)(...args);
              }}
            />
          )}
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
            {uploadingCount > 0 ? "이미지 업로드 중..." : "포트폴리오 수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPortfolio;
