'use client'
import AddQuestionForm from "@/components/question/AddQuestionForm";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

// fetch all languages from database
const fetchLanguages = async () => {
    const { data, error } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/language`
    );
    if (error) {
        toast.error(error.message);
        // throw new Error(error.message);
    }
    return data;
};

const AddQuestionPage = () => {

    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['languages'],
        queryFn: async () => await axios.get(`/api/language`)
    })

    if(isLoading) {
        return <h1 className="text-xl">Loading...</h1>
    }

    if(isError) {
        return <h1>{error.message}</h1>
    }

    const languages =  data.data

    // const languages = await fetchLanguages();

    return (
        <div className="w-full sm:w-[75%] mx-auto lg:w-full">
            <AddQuestionForm languages={languages} />
        </div>
    );
};

export default AddQuestionPage;
