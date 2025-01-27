import { SignedIn, SignedOut } from "@clerk/nextjs";
import { CustomUploadButton } from "./_components/uploadbtn";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap w-full">
      {images.map((image) => (
        <div key={image.id} className="w-1/4 aspect-video overflow-hidden relative cursor-pointer">
          <span className="absolute w-full h-full bg-gradient-to-b from-blue-100 to-transparent py-3 text-center font-bold uppercase">{image.name}</span>
          <img src={image.url} alt="Image Title" className="w-full object-cover object-center" />
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <SignedOut>
          <div className="w-full h-full text-center text-3xl">Please sign in to view the content.</div>
        </SignedOut>
        <SignedIn>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            Gallery
          </h1>
          <CustomUploadButton />
          <Images />
        </SignedIn>
      </div>
    </main>
  );
}
