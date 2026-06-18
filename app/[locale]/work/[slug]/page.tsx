import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects/index";
import CaseStudyPage from "@/components/work/CaseStudyPage";

export async function generateStaticParams() {
  return [{ slug: "forest-awakening" }];
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudyPage project={project} />;
}
