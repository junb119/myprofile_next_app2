"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SkillCategory } from "@prisma/client";
import Input from "@/components/InputText";
import { useRouter } from "next/navigation";

const EditCategoryList = () => {
  const [skillCategory, setSkillCategory] = useState<SkillCategory[] | null>();
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
    const { new: _, ...updateData } = data; // ✅ 'new' 필드 제거

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
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id: any) => {
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
    <form>
      <ul>
        {skillCategory?.map((category) => (
          <li key={category.id} className="flex ">
            <Input
              id={category.id}
              label={"카테고리 이름"}
              register={register}
              errors={errors}
              showLabel={false}
              defaultValue={category.name}
              required
            />
            <span>
              <button
                type="button"
                onClick={() => {
                  const result = confirm("정말 삭제하시겠습니까?");
                  if (result) {
                    handleDelete(category.id);
                  }
                }}
              >
                삭제
              </button>
            </span>
          </li>
        ))}

        <li className="flex">
          <Input
            id="new"
            label="new_category"
            register={register}
            errors={errors}
            placeholder="새 카테고리 이름"
            showLabel={false}
          />
          <button onClick={handleAdd}>등록</button>
        </li>
      </ul>
      <button onClick={handleSubmit(handleEditSubmit)}>확인</button>
    </form>
  );
};

export default EditCategoryList;
