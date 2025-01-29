import { Modal } from "./modal";
import { ImageView } from "~/common/imageview";

export default async function ImageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const allParams = await params;
  const { id: imageId } = allParams;

  return (
    <Modal>
      <ImageView imageId={imageId} />
    </Modal>
  );
}
