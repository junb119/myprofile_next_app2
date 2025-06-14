// "use client";
// import Loader from "@/components/Loader";
// import PageTitle from "@/components/PageTitle";
// import PortfolioModal from "@/components/portfolio/PortfolioModal";
// import { useAdminSession } from "@/hook/useAdminSession";
// import useGetPortfolio from "@/hook/useGetPortfolio";
// import type { Portfolio } from "@prisma/client";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { forwardRef, useState } from "react";

// interface PortfolioWithRelations extends Portfolio {
//   Skills: { name: string; icon: string }[];
//   Role: { name: string }[];
// }

// const Portfolio = () => {
//   const { portfolios, error, loading } = useGetPortfolio();
//   const [selected, setSelected] = useState<PortfolioWithRelations | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const { isAdmin } = useAdminSession();
//   const router = useRouter();
//   const deletePortfolio = async (id: string) => {
//     const confrimDelete = confirm("정말 포트폴리오를 삭제하시겠습니까?");
//     try {
//       if (confrimDelete) {
//         const { data } = await axios.delete(`/api/portfolio/${id}`);
//         if (data) {
//           alert("포트폴리오 삭제 성공");
//           router.refresh();
//           // todo : 삭제시 관련 이미지파일도 삭제
//         }
//       }
//     } catch (error) {
//       alert("포트폴리오 삭제 실패");
//       console.error(error);
//     }
//   };
//   if (loading) return <Loader />;
//   return (
//     <>
//       {/* <PageTitle title="Portfolio" icon="📁" /> */}
//       {isAdmin && (
//         <span>
//           <Link href="/admin/portfolio/add">
//             <button>add</button>
//           </Link>
//         </span>
//       )}

//       <PortfolioModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         portfolio={selected}
//       />

//       <div className="p-6">
//         <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//           {portfolios.map((pf) => (
//             <li
//               key={pf.id}
//               className="bg-[#373737] rounded-xl shadow hover:shadow-md transition duration-300 flex flex-col cursor-pointer  //md:h-[400px] //sm:h-[300px] //h-[400px]"
//               onClick={() => {
//                 setSelected(pf); // 선택한 포트폴리오
//                 setModalOpen(true); // 모달 열기
//               }}
//             >
//               <div class="z-10 sm:order-2 sm:col-span-6">
//                 <h3>
//                   <a
//                     class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base"
//                     href="https://spotify-profile.herokuapp.com/"
//                     target="_blank"
//                     rel="noreferrer noopener"
//                     aria-label="Spotify Profile (opens in a new tab)"
//                   >
//                     <span class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
//                     <span>
//                       Spotify{" "}
//                       <span class="inline-block">
//                         Profile
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                           class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
//                           aria-hidden="true"
//                         >
//                           <path
//                             fill-rule="evenodd"
//                             d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
//                             clip-rule="evenodd"
//                           ></path>
//                         </svg>
//                       </span>
//                     </span>
//                   </a>
//                 </h3>
//                 <p class="mt-2 text-sm leading-normal">
//                   Web app for visualizing personalized Spotify data. View your
//                   top artists, top tracks, recently played tracks, and detailed
//                   audio information about each track. Create and save new
//                   playlists of recommended tracks based on your existing
//                   playlists and more.
//                 </p>
//                 <a
//                   class="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
//                   href="https://github.com/bchiang7/spotify-profile"
//                   target="_blank"
//                   rel="noreferrer noopener"
//                   aria-label="684 stars on GitHub (opens in a new tab)"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     class="mr-1 h-3 w-3"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fill-rule="evenodd"
//                       d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
//                       clip-rule="evenodd"
//                     ></path>
//                   </svg>
//                   <span>684</span>
//                 </a>
//                 <ul class="mt-2 flex flex-wrap" aria-label="Technologies used:">
//                   <li class="mr-1.5 mt-2">
//                     <div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
//                       React
//                     </div>
//                   </li>
//                   <li class="mr-1.5 mt-2">
//                     <div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
//                       Express
//                     </div>
//                   </li>
//                   <li class="mr-1.5 mt-2">
//                     <div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
//                       Spotify API
//                     </div>
//                   </li>
//                   <li class="mr-1.5 mt-2">
//                     <div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">
//                       Heroku
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <div className="w-full  md:h-[250px] sm:h-[150px] h-[250px] flex-shrink-0  relative">
//                 <Image
//                   src={pf.thumb}
//                   alt={pf.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="p-4 flex flex-col justify-between ">
//                 <div>
//                   <h3 className="font-bold text-white text-base">{pf.title}</h3>
//                   {/* 태그 */}
//                   {/* {pf.Skills && pf.Skills.length > 0 && (
//                     <div className="my-2 flex flex-wrap gap-2">
//                       <Tags
//                         list={pf.Skills}
//                         color="sky"
//                         width={16}
//                         height={16}
//                       />
//                     </div>
//                   )} */}
//                   <p className="text-xs text-zinc-400 my-1 text-right">
//                     {pf.period} <span className="mx-1 text-zinc-400">|</span>
//                     {pf.members}명
//                   </p>

//                   <p className="text-sm text-zinc-300 line-clamp-2">
//                     {pf.description}
//                   </p>
//                 </div>
//                 {isAdmin && (
//                   <div className="mt-2 text-right space-x-3">
//                     <Link href={`/admin/portfolio/${pf.id}`} passHref>
//                       <button
//                         className="text-sm text-sky-600 hover:underline"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         Edit
//                       </button>
//                     </Link>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation(); // 카드 클릭 이벤트 막기
//                         deletePortfolio(pf.id);
//                       }}
//                       className="text-sm text-rose-500 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Portfolio;
