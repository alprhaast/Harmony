import { db } from "~/server/db/";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => (model.id),
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
          Gallery
        </h1>
        <div className="flex flex-wrap w-full">
          {images.map((image) => (
            <div key={image.id} className="w-1/4 aspect-video overflow-hidden relative cursor-pointer">
              <span className="absolute">{image.name}</span>
              <img src={image.url} alt="Image Title" className="w-full object-cover object-center transition-transform duration-300 hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
