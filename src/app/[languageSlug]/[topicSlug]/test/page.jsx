"use client";

import SubmitTestButton from "@/components/test/SubmitTestButton";
import TestQuestionList from "@/components/test/TestQuestionList";
import { testResultContext } from "@/context/TestResultContext";
import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

const TestPage = ({ params }) => {
    /* The line `const { topicSlug, languageSlug } = params;` is using object destructuring to extract
    the values of `topicSlug` and `languageSlug` from the URL. */
    const { topicSlug, languageSlug } = params;

    /* Setting the quiz questions to context. This allows the component to update the quiz questions in the
    context state. */
    const { setQuizQuestions } = useContext(testResultContext);

    /* The code is using the `useQuery` hook from the `react-query` library to fetch data from an API
    endpoint. */
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["quiz-test"],
        queryFn: async () =>
            await axios.get(
                `/api/quiz_test/?language=${languageSlug}&topic=${topicSlug}`
            ),
        onSuccess: ({ data }) => {
            setQuizQuestions(data);
        },
    });

    if (isLoading) {
        return <h1 className="text-xl">Loading...</h1>;
    }

    if (isError) {
        toast.error(error.message)
        return <h1>Error: {error.message}</h1>;
    }

    return (
        <div className="w-full py-10">
            <h1 className="text-3xl text-center font-bold my-5">Quiz questions</h1>
            {/* Show all questions in a list */}
            <TestQuestionList />
            {/* Handle final submit button */}
            <SubmitTestButton />
        </div>
    );
};

export default TestPage;
