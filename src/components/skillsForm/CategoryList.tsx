// "use client";
// import React, { useEffect, useState } from "react";
// import Input from "../InputText";
// import { useForm } from "react-hook-form";
// import AddCategoryForm from "./AddCategoryForm";
// import Link from "next/link";

// const CategoryList = ({
//   categories,
//   selectedCategoryId,
//   setSelectedCategoryId,
// }) => {
//   console.log("test", categories);
//   return (
//     <div className="flex gap-4 justify-center">
//       {categories.length > 0 ? (
//         <ul className="flex gap-4">
//           {[...categories]
//             .sort((a, b) => {
//               let diff =
//                 new Date(a.updatedAt).getTime() -
//                 new Date(b.updatedAt).getTime();
//               if (diff === 0) {
//                 diff =
//                   new Date(a.createdAt).getTime() -
//                   new Date(b.createdAt).getTime();
//               }
//               return diff;
//             })
//             .map((category) => (
//               <li
//                 key={category.id}
//                 className={`${
//                   category.id === selectedCategoryId
//                     ? "bg-blue-400"
//                     : "bg-white"
//                 } p-2`}
//               >
//                 <button onClick={() => setSelectedCategoryId(category.id)}>
//                   {category.name}
//                 </button>
//               </li>
//             ))}
//         </ul>
//       ) : (
//         <div>카테고리가 없습니다</div>
//       )}

//       <Link href="/admin/skill/categories/edit">
//         <button>수정</button>
//       </Link>
//     </div>
//   );
// };

// export default CategoryList;
// components/skillsForm/CategoryList.tsx
"use client";

import React from "react";
import Link from "next/link";
import { SkillCategory } from "@prisma/client";
import { useAdminSession } from "@/hook/useAdminSession";

interface CategoryListProps {
  categories: SkillCategory[];
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string) => void;
}

const CategoryList = ({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}: CategoryListProps) => {
  const { isAdmin } = useAdminSession();
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-sm text-zinc-500 mt-4">
        등록된 카테고리가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
      <div>
        {/* ver1 */}
        <ul className="flex flex-wrap justify-center gap-2">
          {categories
            .sort((a, b) => {
              let diff =
                new Date(a.updatedAt).getTime() -
                new Date(b.updatedAt).getTime();
              if (diff === 0) {
                diff =
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime();
              }
              return diff;
            })
            .map((category) => (
              <li key={category.id}>
                <button
                  className={`px-4 py-2 text-sm rounded-full border transition 
                  ${
                    category.id === selectedCategoryId
                      ? "bg-cyan-500 text-white font-semibold shadow"
                      : "bg-white text-zinc-700 hover:bg-cyan-100 font-semibold"
                  }`}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
        </ul>
        {/* ver2 */}
        {/* <ul className="flex border-b justify-center gap-4 mt-4">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`px-4 py-2 text-sm transition border-b-2 ${
                  category.id === selectedCategoryId
                    ? "border-amber-500 text-amber-700 font-semibold"
                    : "border-transparent text-zinc-500 hover:text-zinc-700"
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul> */}
        {/* ver3 */}
        {/* <ul className="flex flex-wrap gap-2 justify-center mt-4">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`px-4 py-1 text-sm rounded-full border transition shadow-sm ${
                  category.id === selectedCategoryId
                    ? "bg-amber-500 text-white"
                    : "bg-white text-zinc-700 hover:bg-amber-100"
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
                >
                {category.name}
              </button>
            </li>
          ))}
        </ul> */}
        {/* ver4 */}
        {/* <ul className="flex flex-col gap-2 mt-4">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`w-full text-left px-4 py-2 text-sm transition rounded-md ${
                  category.id === selectedCategoryId
                    ? "bg-amber-100 text-amber-800 font-semibold"
                    : "hover:bg-zinc-100 text-zinc-600"
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul> */}
        {/* ver5 */}
        {/* <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`w-full text-center p-4 border rounded-lg transition shadow-sm ${
                  category.id === selectedCategoryId
                    ? "bg-amber-100 border-amber-400 text-amber-700 font-semibold"
                    : "bg-white hover:bg-zinc-50 text-zinc-600"
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul> */}
      </div>
      {isAdmin && (
        <Link
          href="/admin/skill/categories/edit"
          className="text-sm px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
        >
          카테고리 수정
        </Link>
      )}
    </div>
  );
};

export default CategoryList;
