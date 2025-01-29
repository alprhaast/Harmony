import { getImage } from "~/server/queries";

export async function ImageView({ imageId }: { imageId: string }) {
  const idAsNumber = Number(imageId);

  if (Number.isNaN(idAsNumber)) {
    return <div className="text-red-500">Invalid image ID</div>;
  }

  const image = await getImage(idAsNumber);

  if (!image) {
    return <div className="text-gray-500">Image not found</div>;
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={image.url}
        className="object-cover"
        style={{ width: "100%", height: "100%" }}
        alt={image.name}
      />
    </div>
  );
}
