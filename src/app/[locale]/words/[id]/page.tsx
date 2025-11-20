import { WordDetail } from "@/components/words/word-detail";

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <WordDetail id={Number(id)} />;
}
