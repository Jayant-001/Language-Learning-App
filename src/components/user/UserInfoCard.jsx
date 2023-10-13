"use client";

import { userContext } from "@/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

const UserInfoCard = () => {
    const { user } = useContext(userContext);
    const router = useRouter();
    const queryClient = useQueryClient();

    // demo user data for testing
    const u = {
        name: "Jayant",
        email: "jayant.gupta.dln@gmail.com",
        memberSince: "10-20-2023",
    };

    // it send api request to rest user's progress
    const resetProgressMutation = useMutation({
        mutationFn: async () => await axios.delete("/api/reset-progress"),
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
            toast.success(data.message);
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });

    const resetProgress = (e) => {
        e.preventDefault();

        // reset mutation
        resetProgressMutation.mutate();
    };

    return (
        <div className="w-full bg-[#282828] p-5 shadow-lg rounded-lg flex flex-col justify-between gap-5 md:gap-0 ">
            <div className="space-y-1">
                <p className="text-xl font-bold">{user.name}</p>
                <p>{user.email}</p>
                <p>
                    <span className="text-sm">Member since: </span>
                    <span className="italic font-semibold">
                        {u.memberSince}
                    </span>
                </p>
            </div>
            <button
                onClick={resetProgress}
                className="mx-0 sm:mx-[10%] md:mx-0 px-5 py-3 rounded-lg shadow-lg bg-[#1f1f1f] active:opacity-70"
            >
                Reset Progress
            </button>
        </div>
    );
};

export default UserInfoCard;
