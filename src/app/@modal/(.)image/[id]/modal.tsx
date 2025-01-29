"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const dialogRef = useRef<ElementRef<"dialog">>(null);

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, []);

	const onDismiss = () => {
		router.back();
	};

	// Function to get image element
	const getImageElement = () => {
		return dialogRef.current?.querySelector("img") as HTMLImageElement | null;
	};

	// Function to download the image with alt name
	const handleDownload = async () => {
		const imgElement = getImageElement();
		if (!imgElement) return;

		const imageUrl = imgElement.src;
		const altText = imgElement.alt || "t3-gallery"; 

		try {
			const response = await fetch(imageUrl, { mode: "cors" });
			const blob = await response.blob();
			const blobUrl = URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = blobUrl;
			a.download = `${altText.replace(/\s+/g, "-")}`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error("Failed to download image:", error);
		}
	};

	const handleOpenNewTab = () => {
		const imgElement = getImageElement();
		if (imgElement) {
			window.open(imgElement.src, "_blank");
		}
	};

	return createPortal(
		<dialog ref={dialogRef} className="relative max-w-[100%] max-h-[100%] m-0 l-0 h-screen w-screen bg-black/70" onClose={onDismiss}>
			<div className="absolute w-[85%] max-w-[85%] h-[85%] max-h-[85%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
				{children}
				<button onClick={onDismiss} className="absolute top-[24px] left-[24px] w-[36px] h-[36px] bg-black/70 text-white hover:bg-black/90 transition duration-300 flex items-center justify-center rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
						<path d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
				<button onClick={handleDownload} className="absolute top-[24px] right-[24px] w-[36px] h-[36px] bg-black/70 text-white hover:bg-black/90 transition duration-300 flex items-center justify-center rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
						<path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
					</svg>
				</button>
				<button onClick={handleOpenNewTab} className="absolute top-[24px] right-[70px] w-[36px] h-[36px] bg-black/70 text-white hover:bg-black/90 transition duration-300 flex items-center justify-center rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
						<path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
					</svg>
				</button>
			</div>
		</dialog>,
		document.getElementById("modal-root")!,
	);
}
