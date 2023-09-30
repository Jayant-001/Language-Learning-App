"use client";

import TestResultContext from "@/context/TestResultContext";
import UserContext from "@/context/UserContext";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import UserComponent from "./UserComponent";

const queryClient = new QueryClient();

const AppLayout = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <UserContext>
                {/* <UserComponent /> */}
                <TestResultContext>{children}</TestResultContext>
            </UserContext>
        </QueryClientProvider>
    );
};

export default AppLayout;
