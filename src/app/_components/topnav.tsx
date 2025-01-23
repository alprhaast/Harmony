import { UploadButton } from "~/utils/uploadthing";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-extrabold sm:text-[2rem]">T3 Harmony</div>
        <div className="flex flex-row">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                {/* <UploadButton endpoint="imageUploader" /> */}
                <UserButton />
            </SignedIn>
        </div>
      </div>
    </nav>
  );
}
