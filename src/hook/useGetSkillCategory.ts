"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetSkillCategory() {
  const [skillCategory, setSkillCategory] = useState<
    { value: string; label: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get("/api/skill/category");
        const newCategory = data.map((category:any) => ({
          value: category.id,
          label: category.name,
        }));
        setSkillCategory(newCategory);
      } catch (error) {
        console.error(error);
        setError("카테고리 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);
  return { skillCategory, error, loading };
}
