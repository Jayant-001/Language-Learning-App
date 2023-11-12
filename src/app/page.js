import LanguageList from "@/components/pages/LanguageList";
import { Suspense } from "react";

// revalidatePath(path);

export default async function Home() {
    return (
        <div className="flex flex-col items-center w-full justify-center min-h-[600px] gap-5 py-10">
            <p className="text-2xl md:text-3xl font-bold text-center">
                <span>It</span>
                <span className="text-red-500">{" doesn't matter "}</span>
                <span>what you learn</span>
                <span className="text-red-500">;</span>
                <br />
                <span>
                    what matters is{" "}
                    <span className="text-green-500">how you learn</span>
                </span>
            </p>
            <p className="text-lg md:text-xl font-semibold text-center">
                Assessment, instruction, and{" "}
                <span className="text-red-500">practice</span> that{" "}
                <span className="text-green-500">motivate</span> every student
            </p>
            <Suspense
                fallback={<p className="text-center my-5">Loading languages</p>}
            >
                <LanguageList />
            </Suspense>
        </div>
    );
}
