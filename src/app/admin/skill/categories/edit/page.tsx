"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SkillCategory } from "@prisma/client";
import Input from "@/components/InputText";
import { useRouter } from "next/navigation";

const EditCategoryList = () => {
  const [skillCategory, setSkillCategory] = useState<SkillCategory[] | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    resetField,
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/skill/category");
        setSkillCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEditSubmit = async (data: any) => {
    const { new: _, ...updateData } = data;
    try {
      await axios.patch("/api/skill/category", updateData);
      router.push("/skills");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    try {
      const newName = getValues("new");
      if (!newName || newName.trim() === "") return;

      await axios.post("/api/skill/category", {
        name: newName,
        description: "",
      });
      resetField("new");
      alert("추가되었습니다.");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/skill/category", {
        data: { id },
      });
      alert("삭제되었습니다.");
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <form className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <ul className="space-y-4">
        {skillCategory?.map((category) => (
          <li key={category.id} className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                id={category.id}
                label="카테고리 이름"
                register={register}
                errors={errors}
                showLabel={false}
                defaultValue={category.name}
                required
              />
            </div>

            <button
              type="button"
              onClick={() => {
                const result = confirm("정말 삭제하시겠습니까?");
                if (result) {
                  handleDelete(category.id);
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              삭제
            </button>
          </li>
        ))}

        <li className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              id="new"
              label="새 카테고리 이름"
              register={register}
              errors={errors}
              placeholder="새 카테고리 이름"
              showLabel={false}
            />
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            등록
          </button>
        </li>
      </ul>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit(handleEditSubmit)}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base font-semibold"
        >
          확인
        </button>
      </div>
    </form>
  );
};

export default EditCategoryList;
