"use client";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export function CustomUploadButton() {
    const router = useRouter();
    return (
        <div className="flex">
             <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    router.refresh();
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR: ${error.message}`);
                }}
            />
        </div>
    )
}