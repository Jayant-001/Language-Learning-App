import axios from "axios";
import Link from "next/link";
import React from "react";

const fetchTopics = async (language) => {
    const { data, error } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topics?language=${language}`
    );
    if (error) {
        toast.error(error.message);
        // throw new Error(error.message);
    }
    return data;
};

const TopicList = async ({ languageSlug, parentPage }) => {
    const topics = await fetchTopics(languageSlug);
    return (
        <main className="w-full mx-auto my-5 font-bold">
            <ul className="flex flex-col gap-3 rounded-lg divide-gray-200 dark:text-gray-100">
                {topics?.map((topic) => (
                    <Link
                        key={topic.id}
                        href={`/${languageSlug}/${topic.slug}/${parentPage}`}
                    >
                        <li className="p-4 flex justify-between items-center rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
                            <span className="font-semibold text-sm">
                                {topic.name}
                            </span>
                            <div className="font-semibold inline-flex px-2 py-1 leading-4 text-xs rounded-full text-teal-700 bg-teal-200 dark:bg-teal-700 dark:text-teal-100">
                                {topic.slug}
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </main>
    );
};

export default TopicList;
