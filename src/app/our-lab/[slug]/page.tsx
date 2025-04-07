import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Redirecting to Savvy Lab - ${params.slug}`,
  };
}

export default function LegacyLabProductDetailPage({ params }: Props) {
  const { slug } = params;
  redirect(`/savvy-lab/${slug}`);
  return null;
}
