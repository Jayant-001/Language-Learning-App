"use client";

import { createContext, useState } from "react";
export const testResultContext = createContext();

const TestResultContextProvider = ({ children }) => {
    const [testResult, setTestResult] = useState(new Map());
    const [quizQuestions, setQuizQuestions] = useState([]);

    return (
        <testResultContext.Provider
            value={{
                testResult,
                setTestResult,
                quizQuestions,
                setQuizQuestions,
            }}
        >
            {children}
        </testResultContext.Provider>
    );
};

export default TestResultContextProvider;
