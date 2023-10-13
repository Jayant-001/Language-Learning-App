"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import QuestionLayout from "./QuestionLayout";

const checkRequiredFields = (question) => {
    if (question.options.length < 2) return "Options";
    if (question.correctOption === "") return "Correct Option";
    if (question.language === "") return "language";
    if (question.topic === "") return "";

    return "";
};

const AddQuestionForm = ({ languages }) => {
    const queryClient = useQueryClient();
    const difficulties = ["Super easy", "Easy", "Medium", "Hard", "Super hard"];
    const [option, setOption] = useState("");
    const [topics, setTopics] = useState([]);
    const [question, setQuestion] = useState({
        name: "",
        options: [],
        correctOption: "",
        difficulty: "1",
        language: "",
        topic: "",
        explanation: "",
    });

    const fetchTopicsMutation = useMutation({
        mutationFn: async (language) =>
            await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topics?language=${language}`
            ),
        onSuccess: ({ data }) => {
            if (data.length > 0) {
                setQuestion({ ...question, topic: data[0].slug });
            }
            setTopics(data);
        },
    });

    const submitQuestionMutation = useMutation({
        mutationFn: async (payload) =>
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question`,
                payload
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["quiz-test"] });
            toast.success("Question uploaded");
        },
    });

    useEffect(() => {
        fetchTopicsMutation.mutate(question.language);
    }, [question.language]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const check = checkRequiredFields(question);
        if (check.length > 0) {
            toast(check + " is required");
            return;
        }

        submitQuestionMutation.mutate(question);
        setQuestion({
            ...question,
            name: "",
            options: [],
            correctOption: "",
            explanation: "",
        });
    };

    const addOptionBtn = (e) => {
        e.preventDefault();

        const options = question.options;
        const optionInput = option.trim();

        if (optionInput.length < 1) {
            toast("Option is empty");
            return;
        }
        options.push(optionInput);
        // setQuestion((prev) => ({ options: [...prev.options, option] }));
        setQuestion({ ...question, options: options });
        setOption("");
    };

    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-evenly py-10 flex-col lg:flex-row gap-5 w-full">
            <form
                className="flex flex-col gap-2 mx-auto w-full "
                onSubmit={handleSubmit}
            >
                {submitQuestionMutation.isSuccess && (
                    <p className="text-center">Question uploaded.</p>
                )}
                {submitQuestionMutation.isLoading && (
                    <p className="text-center text-xl">Loading...</p>
                )}
                {/* Question description */}
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Question
                    </label>
                    <textarea
                        id="name"
                        rows="4"
                        onChange={handleChange}
                        value={question.name}
                        name="name"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write question description here..."
                    ></textarea>
                </div>

                {/* Add options */}
                <div className=" ">
                    <label
                        htmlFor="option"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Add options
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="option"
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                            placeholder="Add option"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                            onClick={addOptionBtn}
                            className="w-fit px-4 font-bold tracking-wider py-[9px] active:opacity-75 bg-zinc-700 rounded-r-lg flex justify-center items-center h-full"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Choose correct option */}
                <div>
                    <label
                        htmlFor="correctOption"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Choose correct option
                    </label>
                    <select
                        id="correctOption"
                        onChange={handleChange}
                        name="correctOption"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Choose correct option</option>
                        {question.options.map((option, id) => (
                            <option key={id} value={id + 1}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <input
                type="text"
                name="correctOption"
                value={question.correctOption}
                onChange={handleChange}
                className={styles.textInput}
                placeholder="Correct option"
            /> */}
                {/* Choose question difficulty */}
                <div>
                    <label
                        htmlFor="difficulty"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Question difficulty
                    </label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {difficulties.map((diff, id) => (
                            <option key={id} value={id + 1}>
                                {diff}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Choose language */}
                <div>
                    <label
                        htmlFor="language"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Choose language
                    </label>
                    <select
                        id="language"
                        onChange={handleChange}
                        name="language"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">Choose language</option>
                        {languages?.map((lang) => (
                            <option key={lang.id} value={lang.slug}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Choose language */}
                <div>
                    <label
                        htmlFor="topic"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Choose topic
                    </label>
                    <select
                        id="topic"
                        onChange={handleChange}
                        name="topic"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {topics?.map((topic) => (
                            <option key={topic.id} value={topic.slug}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Solution explanation */}
                <div>
                    <label
                        htmlFor="explanation"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Solution explanation
                    </label>
                    <textarea
                        id="explanation"
                        rows="4"
                        onChange={handleChange}
                        value={question.explanation}
                        name="explanation"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write solution explanation here..."
                    ></textarea>
                </div>
                <input
                    className="px-2 py-1 border rounded-md text-white cursor-pointer active:bg-[#1f1f1f]"
                    type="submit"
                    value="Submit"
                />
            </form>
            <QuestionLayout question={question} />
        </div>
    );
};

export default AddQuestionForm;
