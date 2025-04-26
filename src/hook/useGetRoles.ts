"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetRoles() {
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data } = await axios.get("/api/portfolio/roles");
        const Roles = data.map((role:any) => ({
          id: role.id,
          name: role.name,
        }));
        setRoles(Roles);
      } catch (error) {
        console.error(error);
        setError("Role 목록 불러오기 실패");
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);
  return { roles, error, loading };
}
