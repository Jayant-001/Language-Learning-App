import React from "react";

const ResultQuestionItem = ({ question, index }) => {
    // show difficulty text and color
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
                        index={id + 1}
                        correctOption={question?.correctOption}
                    />
                ))}
            </div>

            <div className="transition ease-in-out delay-150">
                <p className="mt-3 text-xl font-bold ">Explanation: </p>
                <p className="mt-1">{question?.explanation}</p>
            </div>
        </div>
    );
};

const OptionItem = ({ option, index, correctOption }) => {
    return (
        <div
            className={`border ${
                index === correctOption && "bg-green-600"
            }  rounded-lg px-2 py-2`}
        >
            <div></div>
            <span>{option}</span>
        </div>
    );
};

export default ResultQuestionItem;
