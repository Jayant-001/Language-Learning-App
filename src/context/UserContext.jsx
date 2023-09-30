"use client";

import { createContext, useState } from "react";

export const userContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        name: "demo",
        email: "",
        isAdmin: false,
        points: 0,
    });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext