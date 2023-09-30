'use client'
import { userContext } from "@/context/UserContext";
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";

// fetch User Data from server and store into user's context
const UserComponent = () => {
    const { setUser } = useContext(userContext);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () =>
            await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`),
        onSuccess: ({ data }) => {
            setUser(data);
        },
    });

    return <div />;
};

export default UserComponent;
