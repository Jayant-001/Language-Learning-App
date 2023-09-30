"use client";
import React, { useContext } from "react";
import TestQuestionItem from "./TestQuestionItem";
import { testResultContext } from "@/context/TestResultContext";

const TestQuestionList = () => {
    const {quizQuestions} = useContext(testResultContext);
    return (
        <div className="w-full md:w-[70%] lg:w-[60%] mx-auto flex flex-col gap-5">
            {quizQuestions?.map((question, id) => (
                <TestQuestionItem
                    key={question.id}
                    question={question}
                    index={id}
                />
            ))}
        </div>
    );
};

export default TestQuestionList;
