import Link from "next/link";

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


export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Harmony Gallery
        </h1>
        <div className="flex flex-wrap">
          {mockImages.map((image) => (
            <div key={image.id} className="w-1/4">
              <img src={image.url} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
