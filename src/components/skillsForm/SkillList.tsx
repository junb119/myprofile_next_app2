// // import axios from "axios";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import React from "react";

// // const SkillList = ({ skills, selectedCategoryId }) => {
// //   const filteredSkills = skills?.filter(
// //     (skill) => skill.categoryId === selectedCategoryId
// //   );

// //   const router = useRouter();
// //   const handleSkillDelete = async (id) => {
// //     const isDelete = confirm("정말 삭제하시겠습니까?");
// //     try {
// //       if (isDelete) {
// //         const res = await axios.delete(`/api/skill/items/${id}`);
// //         if (res.status === 200) {
// //           alert("삭제 성공");
// //           router.refresh();
// //         }
// //       }
// //     } catch (error) {
// //       alert("삭제에 실패했습니다.");
// //       console.error(error);
// //     }
// //   };
// //   return (
// //     <>
// //       <ul>
// //         {filteredSkills.length > 0 ? (
// //           filteredSkills?.map((skill) => (
// //             <li key={skill.id}>
// //               <div className="flex gap-4 border">
// //                 <Image src={skill.icon} alt="" width={50} height={50} />
// //                 name : {skill.name} level : {skill.level} desc :{" "}
// //                 {skill.description}
// //               </div>
// //               <Link href={`/admin/skill/skillItems/${[skill.id]}`}>
// //                 <button>Edit</button>
// //               </Link>
// //               <span>
// //                 <button onClick={() => handleSkillDelete(skill.id)}>X</button>
// //               </span>
// //             </li>
// //           ))
// //         ) : (
// //           <div>카테고리에 해당하는 스킬이 없습니다.</div>
// //         )}
// //       </ul>
// //       <Link href="/admin/skill/skillItems/add">add skill</Link>
// //     </>
// //   );
// // };

// // export default SkillList;
// // components/skillsForm/SkillList.tsx

// "use client";

// import { useAdminSession } from "@/hook/useAdminSession";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const getLevelText = (level: number) => {
//   if (level >= 7) return "🔥 능숙해요";
//   if (level >= 5) return "✨ 익숙해요";
//   if (level >= 3) return "🛠 보통이에요";
//   return "🧪 써봤어요";
// };

// const SkillList = ({ skills, selectedCategoryId }) => {
//   const [mounted, setMounted] = useState(false); // 애니메이션용
//   const router = useRouter();

//   const { isAdmin } = useAdminSession();
//   useEffect(() => {
//     const timeout = setTimeout(() => setMounted(true), 100); // 약간의 지연
//     return () => clearTimeout(timeout);
//   }, []);
//   const filteredSkills = skills?.filter(
//     (skill) => skill.categoryId === selectedCategoryId
//   );

//   const handleSkillDelete = async (id) => {
//     const isDelete = confirm("정말 삭제하시겠습니까?");
//     try {
//       if (isDelete) {
//         const res = await axios.delete(`/api/skill/items/${id}`);
//         if (res.status === 200) {
//           alert("삭제 성공");
//           router.refresh();
//         }
//       }
//     } catch (error) {
//       alert("삭제에 실패했습니다.");
//       console.error(error);
//     }
//   };

//   if (!filteredSkills || filteredSkills.length === 0) {
//     return (
//       <div className="text-center text-zinc-500 text-sm py-6">
//         해당 카테고리에 등록된 스킬이 없습니다 😂
//       </div>
//     );
//   }

//   return (
//     // ver1
//     <>
//       <ul className="space-y-4 mt-6 max-w-3xl mx-auto">
//         {filteredSkills.map((skill) => (
//           <li
//             key={skill.id}
//             className="flex items-start gap-4 border rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition"
//           >
//             <Image
//               src={skill.icon}
//               alt={skill.name}
//               width={50}
//               height={50}
//               className="rounded bg-white w-12 h-12 object-contain"
//             />

//             <div className="flex-grow space-y-1">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-zinc-800">
//                   {skill.name}
//                 </h3>
//                 <span className="text-xs text-amber-600">
//                   {getLevelText(skill.level)}
//                 </span>
//               </div>

//               <div className="w-full bg-zinc-200 rounded-full h-2">
//                 <div
//                   className={`bg-amber-400 h-2 rounded-full transition-all duration-700 ease-in-out`}
//                   style={{ width: mounted ? `${skill.level * 10}%` : "0%" }}
//                 ></div>
//               </div>

//               <p className="text-sm text-zinc-500 mt-1">{skill.description}</p>
//             </div>
//             {isAdmin && (
//               <div className="flex flex-col items-end gap-1">
//                 <Link
//                   href={`/admin/skill/skillItems/${skill.id}`}
//                   className="text-xs text-sky-600 hover:underline"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleSkillDelete(skill.id)}
//                   className="text-xs text-rose-500 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default SkillList;

"use client";

import { useAdminSession } from "@/hook/useAdminSession";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const getLevelText = (level: number) => {
  if (level >= 7) return "🔥 자신 있어요";
  if (level >= 5) return "✨ 익숙해요";
  if (level >= 3) return "💡 기본이에요";
  return "🐣 써봤어요";
};

const SkillList = ({ skills, selectedCategoryId }) => {
  const router = useRouter();
  const { isAdmin } = useAdminSession();

  const filteredSkills = skills?.filter(
    (skill) => skill.categoryId === selectedCategoryId
  );

  const handleSkillDelete = async (id) => {
    const isDelete = confirm("정말 삭제하시겠습니까?");
    try {
      if (isDelete) {
        const res = await axios.delete(`/api/skill/items/${id}`);
        if (res.status === 200) {
          alert("삭제 성공");
          router.refresh();
        }
      }
    } catch (error) {
      alert("삭제에 실패했습니다.");
      console.error(error);
    }
  };

  if (!filteredSkills || filteredSkills.length === 0) {
    return (
      <div className="text-center text-zinc-500 text-sm py-6">
        해당 카테고리에 등록된 스킬이 없습니다 😂
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.ul
        key={selectedCategoryId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 mt-6 max-w-3xl mx-auto"
      >
        {filteredSkills.map((skill, index) => (
          <motion.li
            key={skill.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-start gap-4 border rounded-xl bg-white p-4 shadow-sm sm:mx-0 mx-5 hover:shadow-md transition"
          >
            <Image
              src={skill.icon}
              alt={skill.name}
              width={50}
              height={50}
              className="rounded bg-white w-12 h-12 object-contain"
            />

            <div className="flex-grow space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-800">
                  {skill.name}
                </h3>
                <span className="text-xs text-amber-600">
                  {getLevelText(skill.level)}
                </span>
              </div>

              <div className="w-full bg-zinc-200 rounded-full h-2">
                <motion.div
                  className="bg-amber-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level * 10}%` }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                />
              </div>

              <p className="text-sm text-zinc-500 mt-1">{skill.description}</p>
            </div>
            {isAdmin && (
              <div className="flex flex-col items-end gap-1">
                <Link
                  href={`/admin/skill/skillItems/${skill.id}`}
                  className="text-xs text-sky-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleSkillDelete(skill.id)}
                  className="text-xs text-rose-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default SkillList;
