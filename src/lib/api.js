import { useEffect, useState } from "react";
import axios from "axios";

export const API = typeof window !== "undefined"
  ? (process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` : "/api")
  : (process.env.BACKEND_URL || "http://localhost:3000/api");

export const fileUrl = (path) => `${API}/files/${path}`;

export function useProjects() {
  const [projects, setProjects] = useState(null);
  useEffect(() => {
    let alive = true;
    axios.get(`${API}/projects`).then(({ data }) => alive && setProjects(data)).catch(() => alive && setProjects([]));
    return () => {
      alive = false;
    };
  }, []);
  return projects;
}
