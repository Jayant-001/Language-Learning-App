import { userContext } from "@/context/UserContext";
import React, { useContext } from "react";

const getProgressData = (questions) => {
    // console.log(questions);
    const languageTopics = new Map();
    const languages = new Map();
    const topics = new Map();

    questions?.forEach((d) => {
        const langValue = languages.has(d.language)
            ? languages.get(d.language) + 1
            : 1;
        languages.set(d.language, langValue);

        const topicValue = topics.has(d.topic) ? topics.get(d.topic) + 1 : 1;
        topics.set(d.topic, topicValue);

        const currentTopics = languageTopics.has(d.language)
            ? languageTopics.get(d.language)
            : [];
        languageTopics.set(d.language, [...currentTopics, d.topic]);
    });

    // console.log(Array.from(new Set(languageTopics.get("english"))));
    return { languages, languageTopics, topics };
};

const SolvedProblemsDetails = () => {
    const { user } = useContext(userContext);

    const { languages, languageTopics, topics } = getProgressData(
        user.solvedQuestions
    );
    return (
        <div className="w-full bg-[#282828] p-5 shadow-lg rounded-lg  ">
            <h3 className=" mb-2 font-semibold opacity-70 text-lg">
                Solved Problems
            </h3>
            <div className="space-y-4">
                {Array.from(languages?.keys()).map((lang, id) => (
                    <div key={id} className="space-y-2">
                        <div className="flex justify-between text-lg font-bold tracking-wider ">
                            <span>
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </span>
                            <span>x{languages?.get(lang)}</span>
                        </div>
                        <div className=" flex gap-3 flex-wrap">
                            {Array.from(new Set(languageTopics?.get(lang))).map(
                                (topic, i) => (
                                    <div
                                        key={i}
                                        className="text-sm flex gap-1 items-center"
                                    >
                                        <span className="bg-[#464646] px-2 rounded-full py-1">
                                            {topic.charAt(0).toUpperCase() +
                                                topic.slice(1)}
                                        </span>
                                        <span>x{topics?.get(topic)}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolvedProblemsDetails;
