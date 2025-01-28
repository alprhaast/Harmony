import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { CustomUploadButton } from "./_components/uploadbtn";
import { getMyImages, getCurrentUserRole } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  const role = await getCurrentUserRole();

  return (
    <div className="flex flex-wrap w-full">
      {images.map((image) => (
        <div key={image.id} className="flex w-1/4 aspect-video overflow-hidden relative cursor-pointer">
          <span className="absolute w-full h-full bg-yellow-500 bg-opacity-50 py-3 text-center font-bold uppercase">{image.name}</span>
          <Image 
            src={image.url} 
            alt={image.name}
            style={{ objectFit: "cover" }}
            width={400}
            height={400}
            priority={true}
          />
          {role === 'admin' ? (
            <button className="absolute bottom-2 right-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
            </button>
          ) : null}
          {role === 'admin' ? (
            <button className="absolute bottom-2 left-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6">
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {
  const role = await getCurrentUserRole();
  
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
          {role === 'admin' ? <CustomUploadButton /> : null}
          <Images />
        </SignedIn>
      </div>
    </main>
  );
}
