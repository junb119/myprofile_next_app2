"use client";
import { Skill, SkillCategory } from "@prisma/client";
import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState, forwardRef } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import CategoryList from "@/components/skills/skillsForm/CategoryList";
import Link from "next/link";
import SkillList from "@/components/skills/skillsForm/SkillList";
import { useAdminSession } from "@/hook/useAdminSession";
import Loader from "@/components/Loader";

const Skills = ({
  categories,
  skills,
}: {
  categories: SkillCategory[];
  skills: Skill[];
}) => {
  // const { data: categories, isLoading: isLoadingCategories } = useSWR<
  //   SkillCategory[]
  // >("/api/skill/category", fetcher);
  // const { data: skills, isLoading: isLoadingSkills } = useSWR<Skill[]>(
  //   "/api/skill/items",
  //   fetcher
  // );
  const { isAdmin } = useAdminSession();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  // if (isLoadingCategories || isLoadingSkills) return <Loader />;
  return (
    <>
      <nav>
        <CategoryList
          categories={categories ?? []}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </nav>
      <div>
        {isAdmin && <Link href="/admin/skill/skillItems/add">스킬 추가</Link>}
        <SkillList
          skills={skills ?? []}
          selectedCategoryId={selectedCategoryId}
        />
      </div>
    </>
  );
};

export default Skills;
