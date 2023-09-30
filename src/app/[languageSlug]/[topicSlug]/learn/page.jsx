import QuestionItem from "@/components/question/QuestionItem";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

// fetch all question to show on learn page
const fetchQuestions = async (language, topic) => {
    const { data, error } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question?language=${language}&topic=${topic}`
    );
    if (error) {
        toast.error(error.message);
        // throw new Error(error.message);
    }
    return data;
};

const LearnPage = async ({ params }) => {
    const { topicSlug, languageSlug } = params;
    const questions = await fetchQuestions(languageSlug, topicSlug);

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
        </div>
    );
};

export default LearnPage;
