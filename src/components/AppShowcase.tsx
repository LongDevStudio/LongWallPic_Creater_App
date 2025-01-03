import Image from "next/image"

export function AppShowcase() {
    return (
        <div className="relative mx-auto w-72 h-[576px] bg-black rounded-[3rem] shadow-xl overflow-hidden border-[14px] border-black">
            <div className="absolute top-0 inset-x-0">
                <div className="h-6 w-40 bg-black mx-auto rounded-b-2xl"></div>
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden rounded-[2.5rem]">
                <Image
                    src="/images/app-showcase/home-index.png"
                    alt="WallpaperWizard App Interface"
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: "cover"
                    }} />
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gray-800 rounded-t-lg"></div>
        </div>
    );
}

