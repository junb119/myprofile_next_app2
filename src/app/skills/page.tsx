"use client";
import { Skill, SkillCategory } from "@prisma/client";
import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import CategoryList from "@/components/skillsForm/CategoryList";
import Link from "next/link";
import SkillList from "@/components/skillsForm/SkillList";
import { useAdminSession } from "@/hook/useAdminSession";
import Loader from "@/components/Loader";

const Skills = () => {
  const { data: categories, isLoading: isLoadingCategories } = useSWR<
    SkillCategory[]
  >("/api/skill/category", fetcher);
  const { data: skills, isLoading: isLoadingSkills } = useSWR<Skill[]>(
    "/api/skill/items",
    fetcher
  );
  const { isAdmin } = useAdminSession();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  if (isLoadingCategories || isLoadingSkills) return <Loader />;
  return (
    <>
      <PageTitle title="Skills" icon="💻" />
      <nav>
        <CategoryList
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </nav>
      <section>
        {isAdmin && <Link href="/admin/skill/skillItems/add">스킬 추가</Link>}
        <SkillList skills={skills} selectedCategoryId={selectedCategoryId} />
      </section>
    </>
  );
};

export default Skills;
