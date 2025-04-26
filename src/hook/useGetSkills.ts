"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetSkills() {
  const [skills, setSkills] = useState<
    { id: string; name: string; icon: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get("/api/skill/items");
        const Skills = data.map((skill:any) => ({
          id: skill.id,
          name: skill.name,
          icon: skill.icon,
        }));
        setSkills(Skills);
      } catch (error) {
        console.error(error);
        setError("스킬 목록 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);
  return { skills, error, loading };
}
