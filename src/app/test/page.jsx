'use client'
import React from 'react'
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TestPage = () => {

    const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/leaderboard`, fetcher)

    if(!data) {
        return <h1>Loading</h1>
    }

    if(error) {
        console.log(error)
        return <h1>Error happend</h1>
    }

    const users = data;

    return (
        <div className="w-full bg-[#282828] p-5 shadow-lg rounded-lg h-fit">
            <h3 className="mb-2 font-semibold opacity-70 text-lg">Top Rated</h3>
            <div className=" ">
                <div className="grid grid-cols-3 font-bold">
                    <p className="text-center border">#</p>
                    <p className="text-center border">User</p>
                    <p className="text-center border">Points</p>
                </div>

                {users.map((user, id) => (
                    <div key={user.id} className="grid grid-cols-3 ">
                        <p
                            className={`text-center border ${
                                id & 1 && "bg-gray-800"
                            }`}
                        >
                            {id + 1}
                        </p>
                        <p
                            className={`text-center border ${
                                id & 1 && "bg-gray-800"
                            }`}
                        >
                            {user.name}
                        </p>
                        <p
                            className={`text-center border ${
                                id & 1 && "bg-gray-800"
                            }`}
                        >
                            {user.progress?.solvedPoints || 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
  
}

export default TestPage