"use client";

import { userContext } from "@/context/UserContext";
import { useContext } from "react";

const UserInfoCard = () => {
    const { user } = useContext(userContext);
    // console.log("User", user);
    const u = {
        name: "Jayant",
        email: "jayant.gupta.dln@gmail.com",
        memberSince: "10-20-2023",
    };

    return (
        <div className="w-full bg-[#282828] p-5 shadow-lg rounded-lg flex flex-col justify-between gap-5 md:gap-0 ">
            <div className="space-y-1">
                <p className="text-xl font-bold">{user.name}</p>
                <p>{user.email}</p>
                <p>
                    <span className="text-sm">Member since:{" "}</span>
                    <span className="italic font-semibold">
                        {u.memberSince}
                    </span>
                </p>
            </div>
            <button className="mx-0 sm:mx-[10%] md:mx-0 px-5 py-3 rounded-lg shadow-lg bg-[#1f1f1f]">
                Reset Progress
            </button>
        </div>
    );
};

export default UserInfoCard;
