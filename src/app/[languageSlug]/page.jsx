import TopicList from "@/components/pages/TopicList";
import React from "react";

const LanguagePage = async ({ params }) => {
    const { languageSlug } = params;

    return (
        <div className="w-full min-h-[600px] sm:px-[10%] md:px-[5%] ">
            <h3 className="text-2xl md:text-3xl font-bold text-center my-10 md:my-20">Choose a Topic</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 ">
                <div className="w-full">
                    <h1 className="text-xl text-center">Study Materials</h1>
                    <TopicList
                        languageSlug={languageSlug}
                        parentPage={"learn"}
                    />
                </div>
                <div className="w-full">
                    <h1 className="text-xl text-center">Take Quizzes</h1>
                    <TopicList
                        languageSlug={languageSlug}
                        parentPage={"test"}
                    />
                </div>
            </div>
        </div>
    );
};

export default LanguagePage;
