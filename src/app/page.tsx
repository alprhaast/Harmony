import Link from "next/link";
import {db} from "~/server/db/";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaUpzGL9qcKFjr5HwYt1cQ6EBbam0qXA3yz8IkN",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaUP4X2HxbQj7f1eAl6nNk82T5gSpRtchdrobwW",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaUvDecnmSJ65y23WIF1SrTiHVQswBmUgZqkChA",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaULqsR6GDvoNJBpmx7Mhd5ziDbC1lEAW8XIGq3",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaU6lPCUYGlGh7D3i01eISTAdOzfLrW5jXpywKm",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaUr72gbItW8dhwsq16aHgLJyUFtvXQKMuf7PRT",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaUcT9EMpINM7U5Z3PdBwtHKJbYiV0QkhaomTCI",
  "https://trdmr1oftw.ufs.sh/f/Y7S16EekHIaURC2Rx8YTPNGwsXhQFvylnmfgUSiE0xKbZCkp"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));


export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <div className="wrapper min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-tight sm:text-[2rem]">
            T3 Harmony
          </Link>
          <Link href="/login" className="bg-black text-white px-6 py-2 rounded">
            Login
          </Link>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[4rem]">
            Gallery
          </h1>
          <div className="flex flex-wrap w-full">
            {posts.map((post) => (
              <div key={post.id} className="w-1/4 aspect-video overflow-hidden relative cursor-pointer">
                {post.name}
              </div>
            ))}
            {mockImages.map((image) => (
              <div key={image.id} className="w-1/4 aspect-video overflow-hidden relative cursor-pointer">
                <img src={image.url} alt="Image Title" className="w-full objectCover transition-transform duration-300 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
