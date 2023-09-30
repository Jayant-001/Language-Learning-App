"use client";
import React, { useState } from "react";

const QuestionItem = ({ question, index }) => {
    const [choosedOption, setChoosedOption] = useState(0);
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
                        difficultyText[question.difficulty-1].color
                    }`}
                >
                    {difficultyText[question.difficulty-1].name}
                </p>
            </div>
            <p className="text-xl my-2 font-bold">{question?.name}</p>
            <div className="flex flex-col gap-3">
                {question?.options.map((option, id) => (
                    <OptionItem
                        key={id}
                        option={option}
                        index={id + 1}
                        correctOption={question?.correctOption}
                        choosedOption={choosedOption}
                        setChoosedOption={setChoosedOption}
                    />
                ))}
            </div>
            {choosedOption !== 0 && (
                <div className="transition ease-in-out delay-150">
                    <p className="mt-3 text-xl font-bold ">Explanation: </p>
                    <p className="mt-1">{question?.explanation}</p>
                </div>
            )}
        </div>
    );
};

const OptionItem = ({
    option,
    index,
    correctOption,
    choosedOption,
    setChoosedOption,
}) => {
    const selectOption = (e) => {
        e.preventDefault();

        if (choosedOption !== 0) return;

        setChoosedOption(index);
    };

    const bg_style =
        choosedOption !== 0 && correctOption === choosedOption
            ? "bg-green-600"
            : "bg-red-500";

    return (
        <div
            onClick={selectOption}
            className={`border ${choosedOption === 0 && "hover:bg-[#1f1f1f]"} ${
                index === choosedOption && bg_style
            } cursor-pointer rounded-lg px-2 py-2`}
        >
            <span>{option}</span>
        </div>
    );
};

export default QuestionItem;

// transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0 bg-pink-500 text-white font-bold py-2 px-4 rounded-lg
