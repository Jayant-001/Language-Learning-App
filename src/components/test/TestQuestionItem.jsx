"use client";
import { testResultContext } from "@/context/TestResultContext";
import React, { useContext, useEffect, useState } from "react";

const TestQuestionItem = ({ question, index }) => {
    const demoQuestion = {
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
    };
    const { setQuizQuestions } = useContext(testResultContext);
    const [userAns, setUserAns] = useState(0);

    useEffect(() => {
        setQuizQuestions((prev) => {
            const q = prev;
            for (let i = 0; i < q.length; i++) {
                if (i == index) q[i].solved = userAns == question.correctOption;
            }
            return q;
        });
    }, [userAns]);

    const difficultyText = [
        {
            name: "Super Easy",
            color: "text-green-400",
        },
        {
            name: "Easy",
            color: "text-green-600",
        },
        {
            name: "Medium",
            color: "text-yellow-400",
        },
        {
            name: "Hard",
            color: "text-red-400",
        },
        {
            name: "Super Hard",
            color: "text-red-600",
        },
    ];

    return (
        <div className="w-full bg-[#3c3f41] shadow-lg p-3 rounded-lg ">
            <div className="flex justify-between items-center">
                <p className="text-sm">Question {index + 1}</p>
                <p
                    className={`text-sm ${
                        difficultyText[question.difficulty - 1].color
                    }`}
                >
                    {difficultyText[question.difficulty - 1].name}
                </p>
            </div>
            <p className="text-xl my-2 font-bold">{question?.name}</p>
            <div className="flex flex-col gap-3">
                {question?.options.map((option, id) => (
                    <OptionItem
                        key={id}
                        option={option}
                        option_index={id + 1}
                        userAns={userAns}
                        setUserAns={setUserAns}
                    />
                ))}
            </div>
        </div>
    );
};

const OptionItem = ({ option, option_index, userAns, setUserAns }) => {
    const selectOption = (e) => {
        e.preventDefault();

        setUserAns(option_index);
    };

    const bg_style = userAns == option_index ? "bg-gray-600" : "";

    return (
        <div
            onClick={selectOption}
            className={`border ${"hover:bg-[#1f1f1f] cursor-pointer"} ${bg_style} rounded-lg px-2 py-2`}
        >
            <span>{option}</span>
        </div>
    );
};

export default TestQuestionItem;

// transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0 bg-pink-500 text-white font-bold py-2 px-4 rounded-lg
