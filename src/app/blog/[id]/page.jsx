import { GUIDES } from "@/data/guides";
import BlogClient from "./BlogClient";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ id: g.id }));
}

export default function BlogPostPage() {
  return <BlogClient />;
}

