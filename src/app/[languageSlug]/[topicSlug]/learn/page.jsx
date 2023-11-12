import Pagination from "@/components/common/Pagination";
import QuestionItem from "@/components/question/QuestionItem";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

// fetch all question to show on learn page
const fetchQuestions = async (language, topic, page, limit) => {
    const { data, error } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question?language=${language}&topic=${topic}&page=${page}&limit=${limit}`
    );
    if (error) {
        toast.error(error.message);
        // throw new Error(error.message);
    }
    return data;
};

const LearnPage = async ({ params, searchParams }) => {
    const { topicSlug, languageSlug } = params;

    const page =
        typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
    const limit =
        typeof searchParams.limit === "string" ? Number(searchParams.limit) : 5;

    const { questions, hasNextPage } = await fetchQuestions(
        languageSlug,
        topicSlug,
        page,
        limit
    );


    return (
        <div className="w-full md:w-[70%] lg:w-[60%] mx-auto py-10 flex flex-col justify-center items-center">
            <h1 className="text-3xl text-center font-bold mb-5">Questions</h1>
            <div className="my-5 flex flex-col gap-5 w-full px-5">
                {questions?.map((question, id) => (
                    <QuestionItem
                        key={question.id}
                        question={question}
                        index={id + 1}
                    />
                ))}
            </div>
            <Pagination page={page} hasNextPage={hasNextPage} languageSlug={languageSlug} topicSlug={topicSlug} />
        </div>
    );
};

export default LearnPage;
