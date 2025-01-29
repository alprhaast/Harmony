import { ImageView } from "~/common/imageview";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const allParams = await params;
  const { id: imageId } = allParams;

  return (
    <div className="container ml-auto mr-auto flex flex-col items-center justify-center px-4 py-16">
      <ImageView imageId={imageId} />
    </div>
  );
}
