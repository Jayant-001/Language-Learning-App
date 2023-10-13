"use client";
import { testResultContext } from "@/context/TestResultContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

const SubmitTestButton = () => {
    const { setTestResult, quizQuestions } = useContext(testResultContext);
    const router = useRouter();
    const queryClient = useQueryClient();

    /* Send user's marked questions to server to calculate result. */
    const submitTestMutation = useMutation({
        mutationFn: async (markedQuestions) =>
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quiz_test`,
                { markedQuestions }
            ),
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] }); // invalidate leaderboard data
            setTestResult(data);
            router.push("/test-result");
        },
    });

    // Handle quiz submit button
    const submitTest = (e) => {
        e.preventDefault();
        submitTestMutation.mutate(quizQuestions);
    };

    return (
        <button
            onClick={submitTest}
            className="mx-auto flex my-3 bg-slate-500 px-4 py-2 rounded-lg shadow-lg active:bg-slate-600"
        >
            Submit
        </button>
    );
};

export default SubmitTestButton;
