import React from "react";
import UserInfoCard from "./UserInfoCard";
import ProgressCard from "./ProgressCard";

const UserInfo = () => {
    return (
        <div className="w-full justify-between gap-10 flex flex-col md:flex-row py-5">
            <UserInfoCard />
            <ProgressCard />
        </div>
    );
};

export default UserInfo;
