import React from "react";
import { useForm } from "react-hook-form";
import Input from "../InputText";
import axios from "axios";
import { useRouter } from "next/navigation";
interface AddCategoryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddCategoryForm = ({ onSuccess, onCancel }: AddCategoryFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (req: any) => {
    try {
      const { data } = await axios.post("/api/skill/category", req);
      console.log(data);
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      onCancel();
      router.refresh();
    }
  };
  return (
    <form className="flex">
      <Input
        id="name"
        label="new_category"
        register={register}
        errors={errors}
        placeholder="새 카테고리 이름"
        showLabel={false}
      />
      <button onClick={handleSubmit(onSubmit)}>등록</button>
    </form>
  );
};

export default AddCategoryForm;
