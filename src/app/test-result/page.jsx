"use client";
import TestResultQuestionList from "@/components/result/TestResultQuestionList";
import { testResultContext } from "@/context/TestResultContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const TestResultPage = () => {
    const { testResult, quizQuestions } = useContext(testResultContext);
    const router = useRouter();

    const result = {
        totalQuestions: 3,
        solvedQuestions: 0,
        totalPoints: 6,
        earnedPoints: 0,
        accurracy: 0,
    };

    const goToNextTest = (e) => {
        e.preventDefault();

        router.back();
    };

    const questions = [
        {
            id: "cln07uhhc0001t4s44iqcktpo",
            slug: "this-is-______-pen.-1695726619383",
            name: "This is ______ pen.",
            options: ["a", "an", "the", "all valid"],
            correctOption: 1,
            difficulty: 2,
            createdAt: "2023-09-26T11:10:19.390Z",
            languageSlug: "english",
            topicSlug: "articles",
            userEmail: "test@gmail.com",
            explanation:
                "What is a question and examples? Also known as an interrogative sentence, a question is generally distinguished from a sentence that makes a statement, delivers a command, or expresses an exclamation. Linguists commonly recognize three main types of questions: yes/no questions (also known as polar questions), wh- questions, and alternative questions.",
        },
        {
            id: "cln4efolw0009t4pwzqxs6izx",
            slug: "a-a-alkjsdf-lsdkfj-1695979550802",
            name: "a a alkjsdf lsdkfj",
            options: ["abcd", "83", "837"],
            correctOption: 2,
            difficulty: 2,
            createdAt: "2023-09-29T09:25:50.804Z",
            languageSlug: "english",
            topicSlug: "articles",
            userEmail: "jayant@gmail.com",
            explanation: "lkjasd flksdfj sdf",
        },
        {
            id: "cln4eqmpr0001t4r8jmlasg5v",
            slug: "alskdj-sdflkjsd-fj-1695980061560",
            name: "alskdj sdflkjsd fj",
            options: ["ksjkdf", "klsdf"],
            correctOption: 1,
            difficulty: 3,
            createdAt: "2023-09-29T09:34:21.563Z",
            languageSlug: "english",
            topicSlug: "articles",
            userEmail: "jayant@gmail.com",
            explanation: "klasjdf skldjf dsflkj sdflkj",
        },
    ];

    return (
        <div className="w-full min-h-[600px] flex flex-col justify-center items-center space-y-10 py-10 ">
            <div className="bg-[#282828] w-full shadow-lg rounded-lg p-5 space-y-2 md:w-[70%] lg:w-[60%] mx-auto">
                <div className="flex flex-col items-center">
                    <h1 className="text-center text-xl md:text-2xl font-bold tracking-wider mb-2">
                        Quiz Report
                    </h1>
                    <div className="bg-white h-[1px] w-[70%]" />
                </div>
                <div className="flex justify-between items-center text-md">
                    <span>Total questions</span>{" "}
                    <span>{testResult?.totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Solved</span> <span>{testResult?.solvedQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Your accurracy</span>{" "}
                    <span>{parseInt(testResult?.accurracy)}%</span>
                </div>
                <div className="">
                    <span>You earned</span> <span  className="font-bold">{testResult?.earnedPoints}</span>{" "}
                    <span>out of </span> <span className="font-bold">{testResult?.totalPoints}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        className="mx-0 sm:mx-[10%] md:mx-0 px-5 py-3 rounded-lg shadow-lg bg-[#1f1f1f] active:opacity-70"
                        onClick={goToNextTest}
                    >
                        Take Next Quiz
                    </button>

                    <Link
                        className="mx-0 sm:mx-[10%] md:mx-0 px-5 py-3 rounded-lg shadow-lg bg-[#1f1f1f] text-center active:opacity-70"
                        href="/"
                    >
                        Explore more
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-center text-xl md:text-2xl font-bold tracking-wider mb-2">
                    Questions with explanation
                </h1>
                <div className="bg-white h-[1px] w-[70%]" />
            </div>
            <TestResultQuestionList questions={quizQuestions} />
        </div>
    );
};

export default TestResultPage;
