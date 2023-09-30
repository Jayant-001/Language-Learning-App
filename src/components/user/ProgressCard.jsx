"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Progress from "react-progressbar";

const ProgressCard = () => {
    const progress = [
        {
            name: "Easy",
            solved: 54,
            total: 74,
        },
        {
            name: "Medium",
            solved: 44,
            total: 83,
        },
        {
            name: "Hard",
            solved: 21,
            total: 53,
        },
    ];
    return (
        <div className="w-full bg-[#282828] p-5 shadow-lg rounded-lg ">
            <p className="mb-2 font-semibold opacity-70 text-lg">
                Success Rate
            </p>
            <div className="flex gap-5">
                <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={50} text={`${50}%`} />
                </div>
                <div className="space-y-2 w-full text-sm">
                    {progress.map((progress, id) => (
                        <div key={id}>
                            <div className="flex justify-between ">
                                <span>{progress.name}</span>
                                <span className="font-semibold">
                                    {progress.solved}/{progress.total}
                                </span>
                                <span>
                                    {parseInt(
                                        (progress.solved / progress.total) * 100
                                    )}
                                    %
                                </span>
                            </div>
                            <div>
                                <Progress
                                    completed={parseInt(
                                        (progress.solved / progress.total) * 100
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;
