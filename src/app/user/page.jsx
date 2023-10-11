"use client";
import SolvedProblemsDetails from "@/components/user/SolvedProblemsDetails";
import LeaderBoard from "@/components/user/LeaderBoard";
import { userContext } from "@/context/UserContext";
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import UserInfoCard from "@/components/user/UserInfoCard";
import ProgressCard from "@/components/user/ProgressCard";
import toast from "react-hot-toast";

const UserPage = () => {
    const { setUser } = useContext(userContext);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () =>
            await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`),
        onSuccess: ({ data }) => {
            setUser(data);
        },
    });

    if (isLoading) {
        return <h1 className="text-xl">Loading...</h1>;
    }

    if (isError) {
        toast.error(error.message);
        return <h1>{error.message}</h1>;
    }

    return (
        <div className="w-full">
            <div className="w-full justify-evenly gap-10 flex flex-col md:flex-row py-5">
                <UserInfoCard />
                <ProgressCard />
            </div>
            <div className="flex justify-evenly w-full flex-col md:flex-row gap-10">
                <SolvedProblemsDetails />
                <LeaderBoard />
            </div>
        </div>
    );
};

export default UserPage;
