import React from "react";

const QuestionLayout = ({ question }) => {
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
        explanation: "akj dldk ffd dfjk",
    };

    return (
        <div className="w-full mt-1 ">
            <h3 className="font-semibold my-1 text-sm">Question format</h3>
            <div className="w-full bg-[#3c3f41] shadow-lg p-3  h-fit rounded-lg ">
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
        </div>
    );
};

const OptionItem = ({ option, index, correctOption }) => {
    return (
        <div
            className={`border ${
                index == correctOption && "bg-green-600"
            } rounded-lg px-2 py-2`}
        >
            <div></div>
            <span>{option}</span>
        </div>
    );
};

export default QuestionLayout;

// transition-opacity duration-1000 ease-out opacity-100 hover:opacity-0 bg-pink-500 text-white font-bold py-2 px-4 rounded-lg
