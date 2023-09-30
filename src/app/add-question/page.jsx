import AddQuestionForm from "@/components/question/AddQuestionForm";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

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

const AddQuestionPage = async () => {
    const languages = await fetchLanguages();

    return (
        <div className="w-full sm:w-[75%] mx-auto lg:w-full">
            <AddQuestionForm languages={languages} />
        </div>
    );
};

export default AddQuestionPage;
