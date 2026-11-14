import { GUIDES, guideById } from "@/data/guides";
import BlogClient from "./BlogClient";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ id: g.id }));
}

export function generateMetadata({ params }) {
  const guide = guideById[params?.id];
  if (!guide) {
    return {
      title: "Landscape Blog | Blue Heaven Landscape",
    };
  }

  const title = guide.title;
  const description = guide.desc;
  const canonical = `/blog/${guide.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: `${title} | Blue Heaven Landscape`,
      description,
      url: `https://blueheavenlandscape.com${canonical}`,
      images: [
        {
          url: guide.img || "/img/bhl-banner.webp",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [guide.img || "/img/bhl-banner.webp"],
    },
  };
}

export default function BlogPostPage() {
  return <BlogClient />;
}
