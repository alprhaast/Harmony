import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { CustomUploadButton } from "./_components/uploadbtn";
import { getMyImages, getCurrentUserRole, deleteImage } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  const role = await getCurrentUserRole();

  return (
    <div className="flex flex-wrap w-full justify-center sm:justify-start">
      {images.map((image) => (
        <div key={image.id} className="flex w-4/4 sm:w-2/4 lg:w-1/3 xl:w-1/4 aspect-video overflow-hidden relative cursor-pointer">
          <Link href={`/image/${image.id}`} prefetch={false}>
            <Image 
              src={image.url} 
              alt={image.name}
              data-id={image.id}
              data-user={image.userId}
              style={{ objectFit: "cover" }}
              width={400}
              height={400}
              priority={true}
            />
            <h4 className="absolute bottom-0 left-0 bg-gray-800 text-white p-2 w-full h-[35px] pr-[75px]">{image.name}</h4>
          </Link>
          {role === 'admin' ? (
            <form action={async () => {
              "use server";
              await deleteImage(image.id);
            }}>
              <button className="absolute bottom-0 right-0 w-[35px] h-[35px] bg-red-500 text-white hover:bg-red-700 transition duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                  <path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
              </button>
            </form>
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
