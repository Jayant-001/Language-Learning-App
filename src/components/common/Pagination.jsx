"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ page, hasNextPage, languageSlug, topicSlug }) => {

    const router = useRouter();

    return (
        <div className="flex gap-10 items-center ">
            <button
                onClick={() =>
                    router.push(
                        `/${languageSlug}/${topicSlug}/learn?page=${
                            page > 1 ? page - 1 : 1
                        }`
                    )
                }
                type="button"
                disabled={page === 1}
                className="text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Prev
            </button>
            <span className="font-bold text-xl">{page}</span>
            <button
                onClick={() =>
                    router.push(
                        `/${languageSlug}/${topicSlug}/learn?page=${page + 1}`
                    )
                }
                type="button"
                disabled={!hasNextPage}
                className="text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
